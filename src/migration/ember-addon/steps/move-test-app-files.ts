import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, mapFilePaths, moveFiles } from '@codemod-utils/files';

import type { Options } from '../../../types/index.js';

function moveTestsFolder(options: Options): void {
  const { locations, projectRoot } = options;

  let filePaths = findFiles('tests/dummy/**/*', {
    projectRoot,
  });

  let filePathMap = mapFilePaths(filePaths, {
    from: 'tests/dummy',
    to: locations.testApp,
  });

  moveFiles(filePathMap, options);

  filePaths = findFiles('tests/**/*', {
    ignoreList: ['tests/dummy/**/*'],
    projectRoot,
  });

  filePathMap = mapFilePaths(filePaths, {
    from: 'tests',
    to: `${locations.testApp}/tests`,
  });

  moveFiles(filePathMap, options);
}

function moveTypesFolder(options: Options): void {
  const { locations, packages, projectRoot } = options;

  if (!packages.addon.hasTypeScript) {
    return;
  }

  let filePaths = findFiles('types/dummy/**/*', {
    projectRoot,
  });

  let filePathMap = mapFilePaths(filePaths, {
    from: 'types/dummy',
    to: `${locations.testApp}/types/${packages.testApp.name}`,
  });

  moveFiles(filePathMap, options);

  filePaths = findFiles('types/**/*', {
    ignoreList: ['types/dummy/**/*'],
    projectRoot,
  });

  filePathMap = mapFilePaths(filePaths, {
    from: 'types',
    to: `${locations.testApp}/types`,
  });

  moveFiles(filePathMap, options);
}

function renameDummy(options: Options): void {
  const { locations, packages, projectRoot } = options;

  // File extensions had been specified, partly to encode assumptions
  // about Ember, and partly to avoid corrupting non-text files
  const filePaths = findFiles(`${locations.testApp}/**/*.{d.ts,html,js,ts}`, {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const newFile = oldFile.replace(/dummy/g, packages.testApp.name);

    writeFileSync(oldPath, newFile, 'utf8');
  });
}

export function moveTestAppFiles(options: Options): void {
  moveTestsFolder(options);
  moveTypesFolder(options);
  renameDummy(options);
}
