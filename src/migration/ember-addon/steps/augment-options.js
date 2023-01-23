import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import glob from 'glob';

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

  const lockFiles = glob.sync('{package-lock.json,pnpm-lock.yaml,yarn.lock}', {
    cwd: projectRoot,
  });

  if (lockFiles.length !== 1) {
    console.warn('WARNING: Package manager is unknown. Yarn will be assumed.');

    return {
      isNpm: false,
      isPnpm: false,
      isYarn: true,
    };
  }

  const [lockFile] = lockFiles;

  return {
    isNpm: lockFile === 'package-lock.json',
    isPnpm: lockFile === 'pnpm-lock.yaml',
    isYarn: lockFile === 'yarn.lock',
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

export function augmentOptions(codemodOptions) {
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
