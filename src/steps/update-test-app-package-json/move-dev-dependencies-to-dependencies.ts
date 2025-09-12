import { convertToMap, convertToObject } from '@codemod-utils/package-json';

import type { Options, PackageJson } from '../../types/index.js';
import { getVersion } from '../../utils/blueprints.js';

export function moveDependenciesToDevDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  const dependencies = convertToMap(packageJson['dependencies']);
  const devDependencies = convertToMap(packageJson['devDependencies']);

  const packagesToMove = new Set([
    'ember-auto-import',
    'ember-cli-babel',
    'ember-cli-htmlbars',
  ]);

  if (packages.addon.hasTypeScript) {
    packagesToMove.add('ember-cli-typescript');
  }

  Array.from(packagesToMove).forEach((packageName) => {
    if (!dependencies.has(packageName)) {
      return;
    }

    const version = getVersion(packageName, options);

    dependencies.delete(packageName);
    devDependencies.set(packageName, version);
  });

  packageJson['dependencies'] = convertToObject(dependencies);
  packageJson['devDependencies'] = convertToObject(devDependencies);
}
