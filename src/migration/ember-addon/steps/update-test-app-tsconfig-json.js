import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
} from '../../../utils/convert-json-object.js';

function updateCompilerOptions(tsconfigJson, options) {
  const { packages } = options;

  const compilerOptions = convertToMap(tsconfigJson['compilerOptions']);

  compilerOptions.set('paths', {
    [`${packages.testApp.name}/tests/*`]: ['tests/*'],
    [`${packages.testApp.name}/*`]: ['app/*'],
    '*': ['types/*'],
  });

  tsconfigJson['compilerOptions'] = convertToObject(compilerOptions);
}

function updateInclude(tsconfigJson) {
  tsconfigJson['include'] = ['app/**/*', 'tests/**/*', 'types/**/*'];
}

export function updateTestAppTsconfigJson(options) {
  const { locations, packages, projectRoot } = options;

  if (!packages.addon.hasTypeScript) {
    return;
  }

  const oldPath = join(projectRoot, locations.testApp, 'tsconfig.json');
  const oldFile = readFileSync(oldPath, 'utf8');
  const tsconfigJson = JSON.parse(
    // Remove comments
    oldFile.replace(new RegExp('//.*', 'mg'), '')
  );

  updateCompilerOptions(tsconfigJson, options);
  updateInclude(tsconfigJson);

  const newFile = JSON.stringify(tsconfigJson, null, 2) + '\n';

  writeFileSync(oldPath, newFile, 'utf8');
}
