import glob from 'glob';

import { mapFilePaths, moveFiles, removeFiles } from '../../../utils/files.js';

function moveAddonFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = glob.sync('addon/**/*', {
    cwd: projectRoot,
    dot: true,
    nodir: true,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'addon',
    to: `${locations.addon}/src`,
  });

  moveFiles(pathMapping, options);
}

function moveAddonTestSupportFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = glob.sync('addon-test-support/**/*', {
    cwd: projectRoot,
    dot: true,
    nodir: true,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'addon-test-support',
    to: `${locations.addon}/src/test-support`,
  });

  moveFiles(pathMapping, options);
}

function moveBlueprintsFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = glob.sync('blueprints/**/*', {
    cwd: projectRoot,
    dot: true,
    nodir: true,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'blueprints',
    to: `${locations.addon}/blueprints`,
  });

  moveFiles(pathMapping, options);
}

function removeAppFolder(options) {
  const { projectRoot } = options;

  const filePaths = glob.sync('app/**/*', {
    cwd: projectRoot,
    dot: true,
    nodir: true,
  });

  removeFiles(filePaths, options);
}

export function moveAddonFiles(options) {
  moveAddonFolder(options);
  moveAddonTestSupportFolder(options);
  moveBlueprintsFolder(options);
  removeAppFolder(options);
}
