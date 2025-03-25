import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { PackageJson } from '../../types/index.js';

export function updateDependencies(packageJson: PackageJson): void {
  const dependencies = convertToMap(packageJson['dependencies']);

  // Start over
  dependencies.clear();

  packageJson['dependencies'] = convertToObject(dependencies);
}
