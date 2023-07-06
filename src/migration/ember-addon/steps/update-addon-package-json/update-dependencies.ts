import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { Options, PackageJson } from '../../../../types/index.js';
import { getVersion } from '../../../../utils/blueprints.js';

export function updateDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const dependencies = convertToMap(packageJson['dependencies']);

  const packagesToDelete = [
    '@embroider/macros',
    'ember-auto-import',
    'ember-cli-babel',
    'ember-cli-htmlbars',
  ];

  packagesToDelete.forEach((packageName) => {
    dependencies.delete(packageName);
  });

  const packagesToInstall = ['@embroider/addon-shim'];

  packagesToInstall.sort().forEach((packageName) => {
    const version = getVersion(packageName, options);

    dependencies.set(packageName, version);
  });

  packageJson['dependencies'] = convertToObject(dependencies);
}
