import glob from 'glob';

import { decideVersion } from '../../../utils/blueprints.js';
import { renameDirectory } from '../../../utils/files.js';

function getAppReexports(options) {
  const { projectRoot } = options;

  const filePaths = glob.sync('app/**/*.js', {
    cwd: projectRoot,
  });

  return filePaths.map((filePath) => {
    return renameDirectory(filePath, {
      from: 'app',
      to: '',
    });
  });
}

function getProjectRootDevDependencies(options) {
  return {
    concurrently: decideVersion('concurrently', options),
    prettier: decideVersion('prettier', options),
  };
}

function getPublicEntrypoints(options) {
  const { projectRoot } = options;

  const filePaths = glob.sync('{addon,addon-test-support}/**/*.{js,ts}', {
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
      publicEntrypoints: getPublicEntrypoints(options),
    },
    projectRoot: {
      devDependencies: getProjectRootDevDependencies(options),
    },
  };
}
