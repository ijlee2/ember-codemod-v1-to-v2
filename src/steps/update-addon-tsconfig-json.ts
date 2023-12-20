import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { Options, TsConfigJson } from '../types/index.js';
import { sanitizeJson } from '../utils/json.js';

function setExtends(tsConfigJson: TsConfigJson): void {
  tsConfigJson['extends'] = '@tsconfig/ember/tsconfig.json';
}

function setCompilerOptions(
  tsConfigJson: TsConfigJson,
  options: Options,
): void {
  const { packages } = options;

  const compilerOptions = convertToMap();

  compilerOptions.set('allowImportingTsExtensions', true);
  compilerOptions.set('allowJs', true);
  compilerOptions.set('declarationDir', 'declarations');
  compilerOptions.set('rootDir', './src');

  if (!packages.addon.hasGlint) {
    compilerOptions.set('declaration', true);
    compilerOptions.set('emitDeclarationOnly', true);
    compilerOptions.set('noEmit', false);
  }

  tsConfigJson['compilerOptions'] = convertToObject(compilerOptions);
}

function setInclude(tsConfigJson: TsConfigJson): void {
  tsConfigJson['include'] = ['src/**/*', 'unpublished-development-types/**/*'];
}

export function updateAddonTsConfigJson(options: Options): void {
  const { locations, packages, projectRoot } = options;

  if (!packages.addon.hasTypeScript) {
    return;
  }

  const oldPath = join(projectRoot, locations.addon, 'tsconfig.json');
  const oldFile = readFileSync(oldPath, 'utf8');
  const tsConfigJson = JSON.parse(sanitizeJson(oldFile));

  setExtends(tsConfigJson);
  setCompilerOptions(tsConfigJson, options);
  setInclude(tsConfigJson);

  const newFile = JSON.stringify(tsConfigJson, null, 2) + '\n';

  writeFileSync(oldPath, newFile, 'utf8');
}
