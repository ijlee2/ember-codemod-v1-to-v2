import { join } from 'node:path';

import glob from 'glob';

import { decideVersion } from '../../../utils/blueprints.js';

function getAppReexports(options) {
  const { projectRoot } = options;

  const filePaths = glob.sync('**/*.js', {
    cwd: join(projectRoot, 'app'),
  });

  return filePaths;
}

function getProjectRootDevDependencies(options) {
  return {
    concurrently: decideVersion('concurrently', options),
    prettier: decideVersion('prettier', options),
  };
}

function getPublicEntrypoints(options) {
  const { projectRoot } = options;

  const filePaths = glob.sync('**/*.{js,ts}', {
    cwd: join(projectRoot, 'addon'),
  });

  return filePaths.map((filePath) => filePath.replace(/ts$/, 'js'));
}

export function analyzeAddon(options) {
  const appReexports = getAppReexports(options);
  const publicEntrypoints = getPublicEntrypoints(options);

  return {
    appReexports,
    publicEntrypoints,
    projectRoot: {
      devDependencies: getProjectRootDevDependencies(options),
    },
  };
}
