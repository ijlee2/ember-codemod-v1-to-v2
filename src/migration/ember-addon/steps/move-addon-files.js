import {
  findFiles,
  mapFilePaths,
  moveFiles,
  removeFiles,
} from '@codemod-utils/files';

function moveAddonFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('addon/**/*', {
    cwd: projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: 'addon',
    to: `${locations.addon}/src`,
  });

  moveFiles(filePathMap, options);
}

function moveAddonTestSupportFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('addon-test-support/**/*', {
    cwd: projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: 'addon-test-support',
    to: `${locations.addon}/src/test-support`,
  });

  moveFiles(filePathMap, options);
}

function moveBlueprintsFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('blueprints/**/*', {
    cwd: projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: 'blueprints',
    to: `${locations.addon}/blueprints`,
  });

  moveFiles(filePathMap, options);
}

function movePublicFolder(options) {
  const { locations, projectRoot } = options;

  const filePaths = findFiles('public/**/*', {
    cwd: projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: 'public',
    to: `${locations.addon}/public`,
  });

  moveFiles(filePathMap, options);
}

function removeAppFolder(options) {
  const { projectRoot } = options;

  const filePaths = findFiles('app/**/*', {
    cwd: projectRoot,
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
