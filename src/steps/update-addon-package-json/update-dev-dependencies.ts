import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { Options, PackageJson } from '../../types/index.js';
import { getVersion } from '../../utils/blueprints.js';

export function updateDevDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  /*
    For the time being, we'll take the approach of starting over and
    adding back the development dependencies that are required. For
    a more conservative approach, we could delete only the following:

      - @embroider/macros
      - ember-auto-import
      - ember-cli-babel
      - ember-cli-htmlbars
  */
  devDependencies.clear();

  const packagesToInstall = new Set([
    '@babel/core',
    '@babel/plugin-proposal-decorators',
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-class-static-block',
    '@babel/runtime',
    '@embroider/addon-dev',
    '@rollup/plugin-babel',
    'babel-plugin-ember-template-compilation',
    'concurrently',
    'rollup',
    'rollup-plugin-copy',
  ]);

  if (packages.addon.hasTypeScript) {
    packagesToInstall.add('@babel/plugin-transform-typescript');
    packagesToInstall.add('typescript');
  }

  Array.from(packagesToInstall).forEach((packageName) => {
    const version = getVersion(packageName, options);

    devDependencies.set(packageName, version);
  });

  packageJson['devDependencies'] = convertToObject(devDependencies);
}
