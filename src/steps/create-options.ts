import { findFiles } from '@codemod-utils/files';
import { readPackageJson, validatePackageJson } from '@codemod-utils/json';

import type { CodemodOptions, Options } from '../types/index.js';

type AddonPackage = Options['packages']['addon'];
type PackageManager = Options['packageManager'];

function analyzePackageJson(codemodOptions: CodemodOptions): AddonPackage {
  const { projectRoot } = codemodOptions;

  const packageJson = readPackageJson({ projectRoot });

  validatePackageJson(packageJson);

  const {
    dependencies,
    devDependencies,
    'ember-addon': emberAddon,
    name,
    version,
  } = packageJson;

  const projectDependencies = new Map<string, string>([
    ...(Object.entries(dependencies ?? {}) as [string, string][]),
    ...(Object.entries(devDependencies ?? {}) as [string, string][]),
  ]);

  return {
    dependencies: projectDependencies,
    hasGlint: projectDependencies.has('@glint/core'),
    hasTypeScript: projectDependencies.has('typescript'),
    isV1Addon: Boolean(emberAddon),
    name: name!,
    version: version!,
  };
}

function analyzePackageManager(codemodOptions: CodemodOptions): PackageManager {
  const { projectRoot } = codemodOptions;

  const mapping = new Map([
    ['package-lock.json', 'npm'],
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
  ]);

  const lockFiles = Array.from(mapping.keys());

  const filePaths = findFiles(lockFiles, {
    projectRoot,
  });

  if (filePaths.length !== 1) {
    console.warn('WARNING: Package manager is unknown. Yarn will be assumed.');

    return {
      isNpm: false,
      isPnpm: false,
      isYarn: true,
    };
  }

  const packageManager = mapping.get(filePaths[0]!);

  return {
    isNpm: packageManager === 'npm',
    isPnpm: packageManager === 'pnpm',
    isYarn: packageManager === 'yarn',
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
  const packageManager = analyzePackageManager(codemodOptions);

  return {
    locations: {
      addon: codemodOptions.addonLocation ?? deriveAddonLocation(addonPackage),
      testApp: codemodOptions.testAppLocation ?? 'test-app',
    },
    packageManager,
    packages: {
      addon: addonPackage,
      testApp: {
        name: codemodOptions.testAppName ?? 'test-app',
      },
    },
    projectRoot: codemodOptions.projectRoot,
  };
}
