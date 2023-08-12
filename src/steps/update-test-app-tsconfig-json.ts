import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { Options, TsConfigJson } from '../types/index.js';
import { sanitizeJson } from '../utils/json.js';

function updateCompilerOptions(
  tsConfigJson: TsConfigJson,
  options: Options,
): void {
  const { packages } = options;

  const compilerOptions = convertToMap(tsConfigJson['compilerOptions']);

  compilerOptions.set('paths', {
    [`${packages.testApp.name}/tests/*`]: ['tests/*'],
    [`${packages.testApp.name}/*`]: ['app/*'],
    '*': ['types/*'],
  });

  tsConfigJson['compilerOptions'] = convertToObject(compilerOptions);
}

function updateInclude(tsConfigJson: TsConfigJson): void {
  tsConfigJson['include'] = ['app/**/*', 'tests/**/*', 'types/**/*'];
}

export function updateTestAppTsConfigJson(options: Options): void {
  const { locations, packages, projectRoot } = options;

  if (!packages.addon.hasTypeScript) {
    return;
  }

  const oldPath = join(projectRoot, locations.testApp, 'tsconfig.json');
  const oldFile = readFileSync(oldPath, 'utf8');
  const tsConfigJson = JSON.parse(sanitizeJson(oldFile));

  updateCompilerOptions(tsConfigJson, options);
  updateInclude(tsConfigJson);

  const newFile = JSON.stringify(tsConfigJson, null, 2) + '\n';

  writeFileSync(oldPath, newFile, 'utf8');
}
