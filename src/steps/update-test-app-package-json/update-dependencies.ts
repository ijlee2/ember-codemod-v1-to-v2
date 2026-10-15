import { convertToMap, convertToObject } from '@codemod-utils/package-json';

import type { PackageJson } from '../../types/index.js';

export function updateDependencies(packageJson: PackageJson): void {
  const dependencies = convertToMap(packageJson['dependencies']);

  // Start over
  dependencies.clear();

  // oxlint-disable-next-line typescript/no-unsafe-assignment
  packageJson['dependencies'] = convertToObject(dependencies);
}
