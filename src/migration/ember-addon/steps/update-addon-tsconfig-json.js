import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
  sanitizeJson,
} from '../../../utils/convert-json-object.js';

function updateCompilerOptions(tsconfigJson) {
  const compilerOptions = convertToMap(tsconfigJson['compilerOptions']);

  compilerOptions.delete('baseUrl');
  compilerOptions.delete('paths');

  tsconfigJson['compilerOptions'] = convertToObject(compilerOptions);
}

function updateInclude(tsconfigJson) {
  tsconfigJson['include'] = ['src/**/*', 'unpublished-development-types/**/*'];
}

export function updateAddonTsconfigJson(options) {
  const { locations, packages, projectRoot } = options;

  if (!packages.addon.hasTypeScript) {
    return;
  }

  const oldPath = join(projectRoot, locations.addon, 'tsconfig.json');
  const oldFile = readFileSync(oldPath, 'utf8');
  const tsconfigJson = JSON.parse(sanitizeJson(oldFile));

  updateCompilerOptions(tsconfigJson);
  updateInclude(tsconfigJson);

  const newFile = JSON.stringify(tsconfigJson, null, 2) + '\n';

  writeFileSync(oldPath, newFile, 'utf8');
}
