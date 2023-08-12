import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { PackageJson } from '../../types/index.js';

export function updateDependencies(packageJson: PackageJson): void {
  const dependencies = convertToMap(packageJson['dependencies']);

  /*
    For the time being, we'll take the approach of starting over and
    adding back the dependencies that are required.
  */
  dependencies.clear();

  packageJson['dependencies'] = convertToObject(dependencies);
}
