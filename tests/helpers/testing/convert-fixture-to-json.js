import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '../../../src/utils/files.js';

function updateJson(json, { currentDirectory, keys }) {
  const key = keys.shift();
  const isFile = keys.length === 0;

  if (isFile) {
    json[key] = readFileSync(join(currentDirectory, key), 'utf8');

    return;
  }

  if (!(key in json)) {
    json[key] = {};
  }

  updateJson(json[key], {
    currentDirectory: join(currentDirectory, key),
    keys,
  });
}

function createJson(filePaths = [], currentDirectory) {
  const json = {};

  filePaths.forEach((filePath) => {
    const keys = filePath.split('/');

    updateJson(json, { currentDirectory, keys });
  });

  return json;
}

export function convertFixtureToJson(projectRoot) {
  const currentDirectory = `${process.cwd()}/tests/fixtures/${projectRoot}`;

  const filePaths = findFiles('**/*', {
    cwd: currentDirectory,
  });

  return createJson(filePaths, currentDirectory);
}
