import {
  findFiles,
  mapFilePaths,
  moveFiles,
  removeFiles,
} from '@codemod-utils/files';

import type { Options } from '../types/index.js';

function moveAddonFolder(options: Options): void {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('addon/**/*', {
    projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: 'addon',
    to: `${locations.addon}/src`,
  });

  moveFiles(filePathMap, options);
}

function moveAddonTestSupportFolder(options: Options): void {
  const { locations, projectRoot } = options;

  let filePaths = findFiles('addon-test-support/index.{js,ts}', {
    projectRoot,
  });

  if (filePaths.length === 1) {
    const oldPath = filePaths[0]!;
    const newPath = `${locations.addon}/src/test-support${oldPath.endsWith('.ts') ? '.ts' : 'js'}`;

    moveFiles(new Map([[oldPath, newPath]]), options);
  }

  filePaths = findFiles('addon-test-support/**/*', {
    ignoreList: ['addon-test-support/index.{js,ts}'],
    projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: 'addon-test-support',
    to: `${locations.addon}/src/test-support`,
  });

  moveFiles(filePathMap, options);
}

function moveBlueprintsFolder(options: Options): void {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('blueprints/**/*', {
    projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: 'blueprints',
    to: `${locations.addon}/blueprints`,
  });

  moveFiles(filePathMap, options);
}

function movePublicFolder(options: Options): void {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('public/**/*', {
    projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: 'public',
    to: `${locations.addon}/public`,
  });

  moveFiles(filePathMap, options);
}

function removeAppFolder(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('app/**/*', {
    projectRoot,
  });

  removeFiles(filePaths, options);
}

export function moveAddonFiles(options: Options): void {
  moveAddonFolder(options);
  moveAddonTestSupportFolder(options);
  moveBlueprintsFolder(options);
  movePublicFolder(options);
  removeAppFolder(options);
}
