import glob from 'glob';

import { moveFiles, removeFiles } from '../../../utils/files.js';
import { mapFilePaths } from '../../../utils/map-file-paths.js';

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

  const pathMapping = mapFilePaths(filePaths, {
    from: 'app',
    to: 'app',
  });

  removeFiles(pathMapping, options);
}

export function moveAddonFiles(options) {
  moveAddonFolder(options);
  moveAddonTestSupportFolder(options);
  moveBlueprintsFolder(options);
  removeAppFolder(options);
}
