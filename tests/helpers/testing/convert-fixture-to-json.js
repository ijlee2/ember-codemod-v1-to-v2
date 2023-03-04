import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { globSync } from 'glob';

function updateJson(json, { keys, projectRoot }) {
  const key = keys.shift();
  const isFile = keys.length === 0;

  if (isFile) {
    json[key] = readFileSync(join(projectRoot, key), 'utf8');

    return;
  }

  if (!(key in json)) {
    json[key] = {};
  }

  updateJson(json[key], {
    keys,
    projectRoot: join(projectRoot, key),
  });
}

function createJson(filePaths = [], projectRoot) {
  const json = {};

  filePaths.forEach((filePath) => {
    const keys = filePath.split('/');

    updateJson(json, { keys, projectRoot });
  });

  return json;
}

export function convertFixtureToJson(projectRoot) {
  const absolutePath = `${process.cwd()}/tests/fixtures/${projectRoot}`;

  const filePaths = globSync('**/*', {
    cwd: absolutePath,
    dot: true,
    nodir: true,
  });

  return createJson(filePaths, absolutePath);
}
