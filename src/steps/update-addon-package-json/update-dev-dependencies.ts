import { convertToMap, convertToObject } from '@codemod-utils/package-json';

import type { Options, PackageJson } from '../../types/index.js';
import { getLatestVersion } from '../../utils/blueprints.js';

export function updateDevDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  // Start over
  devDependencies.clear();

  const packagesToInstall = new Set([
    '@babel/core',
    '@babel/runtime',
    '@embroider/addon-dev',
    '@eslint/js',
    '@ijlee2-frontend-configs/ember-template-lint',
    '@ijlee2-frontend-configs/eslint-config-ember',
    '@ijlee2-frontend-configs/prettier',
    '@ijlee2-frontend-configs/stylelint',
    '@rollup/plugin-babel',
    'babel-plugin-ember-template-compilation',
    'concurrently',
    'ember-template-lint',
    'eslint',
    'prettier',
    'stylelint',
    'rollup',
    'rollup-plugin-copy',
  ]);

  if (packages.addon.hasTypeScript) {
    packagesToInstall.add('@babel/plugin-transform-typescript');
    packagesToInstall.add('@tsconfig/ember');
    packagesToInstall.add('ember-source');
    packagesToInstall.add('typescript');
  }

  if (packages.addon.hasGlint) {
    packagesToInstall.add('@glint/core');
    packagesToInstall.add('@glint/environment-ember-loose');
    packagesToInstall.add('@glint/environment-ember-template-imports');
    packagesToInstall.add('@glint/template');
  }

  packagesToInstall.forEach((packageName) => {
    const version = getLatestVersion(packageName);

    devDependencies.set(packageName, version);
  });

  packageJson['devDependencies'] = convertToObject(devDependencies);
}
