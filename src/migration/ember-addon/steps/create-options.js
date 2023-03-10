import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, unionize } from '../../../utils/files.js';

function analyzePackageJson(codemodOptions) {
  const { projectRoot } = codemodOptions;

  try {
    const packageJsonFile = readFileSync(
      join(projectRoot, 'package.json'),
      'utf8'
    );

    const {
      dependencies,
      devDependencies,
      'ember-addon': emberAddon,
      name,
      version,
    } = JSON.parse(packageJsonFile);

    if (!name) {
      throw new SyntaxError('Package name is missing.');
    }

    if (!version) {
      throw new SyntaxError('Package version is missing.');
    }

    const projectDependencies = new Map([
      ...Object.entries(dependencies ?? {}),
      ...Object.entries(devDependencies ?? {}),
    ]);

    return {
      dependencies: projectDependencies,
      hasGlint: projectDependencies.has('@glint/core'),
      hasTypeScript: projectDependencies.has('typescript'),
      isV1Addon: Boolean(emberAddon),
      name,
      version,
    };
  } catch (e) {
    throw new SyntaxError(
      `ERROR: package.json is missing or is not valid. (${e.message})\n`
    );
  }
}

function analyzePackageManager(codemodOptions) {
  const { projectRoot } = codemodOptions;

  const mapping = new Map([
    ['package-lock.json', 'npm'],
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
  ]);

  const lockFiles = [...mapping.keys()];

  const filePaths = findFiles(unionize(lockFiles), {
    cwd: projectRoot,
  });

  if (filePaths.length !== 1) {
    console.warn('WARNING: Package manager is unknown. Yarn will be assumed.');

    return {
      isNpm: false,
      isPnpm: false,
      isYarn: true,
    };
  }

  const packageManager = mapping.get(filePaths[0]);

  return {
    isNpm: packageManager === 'npm',
    isPnpm: packageManager === 'pnpm',
    isYarn: packageManager === 'yarn',
  };
}

function deriveAddonLocation(addonPackage) {
  // Package is not scoped
  if (!addonPackage.name.includes('/')) {
    return addonPackage.name;
  }

  // eslint-disable-next-line no-unused-vars
  const [scope, packageName] = addonPackage.name.split('/');

  if (!packageName) {
    throw new SyntaxError(
      `ERROR: In package.json, the package name \`${addonPackage.name}\` is not valid.`
    );
  }

  return packageName;
}

export function createOptions(codemodOptions) {
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
