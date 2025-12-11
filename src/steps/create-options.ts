import {
  getPackageType,
  readPackageJson,
  validatePackageJson,
} from '@codemod-utils/package-json';

import type { CodemodOptions, Options } from '../types/index.js';

type AddonPackage = Options['packages']['addon'];

function analyzePackageJson(codemodOptions: CodemodOptions): AddonPackage {
  const { projectRoot } = codemodOptions;

  const packageJson = readPackageJson({ projectRoot });

  validatePackageJson(packageJson);

  const { dependencies, devDependencies, name, version } = packageJson;

  const projectDependencies = new Map([
    ...Object.entries(dependencies ?? {}),
    ...Object.entries(devDependencies ?? {}),
  ]) as Map<string, string>;

  return {
    dependencies: projectDependencies,
    hasGlint:
      projectDependencies.has('@glint/core') ||
      projectDependencies.has('@glint/ember-tsc'),
    hasTypeScript: projectDependencies.has('typescript'),
    isV1Addon: getPackageType(packageJson) === 'v1-addon',
    name,
    version,
  };
}

function deriveAddonLocation(addonPackage: AddonPackage): string {
  const hasScope = addonPackage.name.includes('/');

  if (!hasScope) {
    return addonPackage.name;
  }

  const packageName = addonPackage.name.split('/')[1]!;

  return packageName;
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const addonPackage = analyzePackageJson(codemodOptions);

  return {
    locations: {
      addon: codemodOptions.addonLocation ?? deriveAddonLocation(addonPackage),
      testApp: codemodOptions.testAppLocation ?? 'test-app',
    },
    packages: {
      addon: addonPackage,
      testApp: {
        name: codemodOptions.testAppName ?? 'test-app',
      },
    },
    projectRoot: codemodOptions.projectRoot,
  };
}
