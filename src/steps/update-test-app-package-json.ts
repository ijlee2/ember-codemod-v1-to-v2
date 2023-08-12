import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { readPackageJson } from '@codemod-utils/json';

import type { Options } from '../types/index.js';
import {
  moveDependenciesToDevDependencies,
  updateDependencies,
  updateDevDependencies,
  updateOtherFields,
} from './update-test-app-package-json/index.js';

export function updateTestAppPackageJson(options: Options): void {
  const { locations, projectRoot } = options;

  const packageJson = readPackageJson({
    projectRoot: join(projectRoot, locations.testApp),
  });

  moveDependenciesToDevDependencies(packageJson, options);
  updateDependencies(packageJson);
  updateDevDependencies(packageJson, options);
  updateOtherFields(packageJson, options);

  const destination = join(projectRoot, locations.testApp, 'package.json');
  const file = JSON.stringify(packageJson, null, 2) + '\n';

  writeFileSync(destination, file, 'utf8');
}
