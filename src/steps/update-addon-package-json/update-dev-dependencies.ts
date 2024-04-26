import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { Options, PackageJson } from '../../types/index.js';
import { getLatestVersion } from '../../utils/blueprints.js';

export function updateDevDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  /*
    The codemod sets the development dependencies that v2 addons need.
    End-developers must add dependencies that their v1 addon needed.
  */
  devDependencies.clear();

  const packagesToInstall = new Set([
    '@babel/core',
    '@babel/eslint-parser',
    '@babel/runtime',
    '@embroider/addon-dev',
    '@rollup/plugin-babel',
    'babel-plugin-ember-template-compilation',
    'concurrently',
    'ember-template-lint',
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-ember',
    'eslint-plugin-import',
    'eslint-plugin-n',
    'eslint-plugin-prettier',
    'prettier',
    'rollup',
    'rollup-plugin-copy',
  ]);

  if (packages.addon.hasTypeScript) {
    packagesToInstall.delete('@babel/eslint-parser');
    packagesToInstall.add('@babel/plugin-transform-typescript');
    packagesToInstall.add('@tsconfig/ember');
    packagesToInstall.add('@types/ember__component');
    packagesToInstall.add('@types/ember__object');
    packagesToInstall.add('@types/ember__service');
    packagesToInstall.add('@typescript-eslint/eslint-plugin');
    packagesToInstall.add('@typescript-eslint/parser');
    packagesToInstall.add('typescript');
  }

  if (packages.addon.hasGlint) {
    packagesToInstall.add('@glint/core');
    packagesToInstall.add('@glint/environment-ember-loose');
    packagesToInstall.add('@glint/template');
  }

  Array.from(packagesToInstall).forEach((packageName) => {
    const version = getLatestVersion(packageName);

    devDependencies.set(packageName, version);
  });

  packageJson['devDependencies'] = convertToObject(devDependencies);
}
