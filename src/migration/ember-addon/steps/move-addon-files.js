import {
  findFiles,
  mapFilePaths,
  moveFiles,
  removeFiles,
} from '../../../utils/files.js';

function moveAddonFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('addon/**/*', {
    cwd: projectRoot,
    matchFilesOnly: true,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'addon',
    to: `${locations.addon}/src`,
  });

  moveFiles(pathMapping, options);
}

function moveAddonTestSupportFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('addon-test-support/**/*', {
    cwd: projectRoot,
    matchFilesOnly: true,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'addon-test-support',
    to: `${locations.addon}/src/test-support`,
  });

  moveFiles(pathMapping, options);
}

function moveBlueprintsFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('blueprints/**/*', {
    cwd: projectRoot,
    matchFilesOnly: true,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'blueprints',
    to: `${locations.addon}/blueprints`,
  });

  moveFiles(pathMapping, options);
}

function movePublicFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('public/**/*', {
    cwd: projectRoot,
    matchFilesOnly: true,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'public',
    to: `${locations.addon}/public`,
  });

  moveFiles(pathMapping, options);
}

function removeAppFolder(options) {
  const { projectRoot } = options;

  const filePaths = findFiles('app/**/*', {
    cwd: projectRoot,
    matchFilesOnly: true,
  });

  removeFiles(filePaths, options);
}

export function moveAddonFiles(options) {
  moveAddonFolder(options);
  moveAddonTestSupportFolder(options);
  moveBlueprintsFolder(options);
  movePublicFolder(options);
  removeAppFolder(options);
}
