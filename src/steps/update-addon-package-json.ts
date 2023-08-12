import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { readPackageJson } from '@codemod-utils/json';

import type { Context, Options } from '../../../types/index.js';
import {
  updateDependencies,
  updateDevDependencies,
  updateOtherFields,
  updateScripts,
} from './update-addon-package-json/index.js';

export function updateAddonPackageJson(
  context: Context,
  options: Options,
): void {
  const { locations, projectRoot } = options;

  const packageJson = readPackageJson({
    projectRoot: join(projectRoot, locations.addon),
  });

  updateDependencies(packageJson, options);
  updateDevDependencies(packageJson, options);
  updateScripts(packageJson, options);
  updateOtherFields(packageJson, context, options);

  const destination = join(projectRoot, locations.addon, 'package.json');
  const file = JSON.stringify(packageJson, null, 2) + '\n';

  writeFileSync(destination, file, 'utf8');
}
