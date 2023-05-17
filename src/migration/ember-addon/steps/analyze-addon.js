import { findFiles, renameDirectory } from '@codemod-utils/files';

import { getVersion } from '../../../utils/blueprints.js';

function getAppReexports(options) {
  const { projectRoot } = options;

  const filePaths = findFiles('app/**/*.js', {
    cwd: projectRoot,
  });

  return filePaths
    .map((filePath) => {
      return renameDirectory(filePath, {
        from: 'app',
        to: '',
      });
    })
    .sort();
}

function getProjectRootDevDependencies(options) {
  return {
    concurrently: getVersion('concurrently', options),
  };
}

function getPublicAssets(options) {
  const { projectRoot } = options;

  const filePaths = findFiles('public/**/*', {
    cwd: projectRoot,
  });

  return filePaths
    .map((filePath) => {
      return renameDirectory(filePath, {
        from: 'public',
        to: '',
      });
    })
    .sort();
}

function getPublicEntrypoints(options) {
  const { projectRoot } = options;

  const filePaths = findFiles('{addon,addon-test-support}/**/*.{js,ts}', {
    cwd: projectRoot,
  });

  return filePaths
    .map((filePath) => {
      return renameDirectory(filePath, {
        from: 'addon',
        to: '',
      });
    })
    .map((filePath) => {
      return renameDirectory(filePath, {
        from: 'addon-test-support',
        to: 'test-support',
      });
    })
    .map((filePath) => {
      return filePath.replace(/ts$/, 'js');
    })
    .sort();
}

export function analyzeAddon(options) {
  return {
    addon: {
      appReexports: getAppReexports(options),
      publicAssets: getPublicAssets(options),
      publicEntrypoints: getPublicEntrypoints(options),
    },
    projectRoot: {
      devDependencies: getProjectRootDevDependencies(options),
    },
  };
}
