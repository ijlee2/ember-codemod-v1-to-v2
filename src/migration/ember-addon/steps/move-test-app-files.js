import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import glob from 'glob';

import { moveFiles } from '../../../utils/files.js';
import { mapFilePaths } from '../../../utils/map-file-paths.js';

function moveTestsFolder(options) {
  const { locations, projectRoot } = options;

  let filePaths = glob.sync('tests/dummy/**/*', {
    cwd: projectRoot,
    dot: true,
    nodir: true,
  });

  let pathMapping = mapFilePaths(filePaths, {
    from: 'tests/dummy',
    to: locations.testApp,
  });

  moveFiles(pathMapping, options);

  filePaths = glob.sync('tests/**/*', {
    cwd: projectRoot,
    dot: true,
    ignore: 'tests/dummy/**/*',
    nodir: true,
  });

  pathMapping = mapFilePaths(filePaths, {
    from: 'tests',
    to: `${locations.testApp}/tests`,
  });

  moveFiles(pathMapping, options);
}

function moveTypesFolder(options) {
  const { locations, packages, projectRoot } = options;

  if (!packages.addon.hasTypeScript) {
    return;
  }

  let filePaths = glob.sync('types/dummy/**/*', {
    cwd: projectRoot,
    dot: true,
    nodir: true,
  });

  let pathMapping = mapFilePaths(filePaths, {
    from: 'types/dummy',
    to: `${locations.testApp}/types/${packages.testApp.name}`,
  });

  moveFiles(pathMapping, options);

  filePaths = glob.sync('types/**/*', {
    cwd: projectRoot,
    dot: true,
    ignore: 'types/dummy/**/*',
    nodir: true,
  });

  pathMapping = mapFilePaths(filePaths, {
    from: 'types',
    to: `${locations.testApp}/types`,
  });

  moveFiles(pathMapping, options);
}

function renameDummy(options) {
  const { locations, packages, projectRoot } = options;

  // File extensions had been specified, partly to encode assumptions
  // about Ember, and partly to avoid corrupting non-text files
  const filePaths = glob.sync(`${locations.testApp}/**/*.{d.ts,html,js,ts}`, {
    cwd: projectRoot,
    dot: true,
    nodir: true,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const newFile = oldFile.replace(
      new RegExp('dummy', 'g'),
      packages.testApp.name
    );

    writeFileSync(oldPath, newFile, 'utf8');
  });
}

export function moveTestAppFiles(options) {
  moveTestsFolder(options);
  moveTypesFolder(options);
  renameDummy(options);
}
