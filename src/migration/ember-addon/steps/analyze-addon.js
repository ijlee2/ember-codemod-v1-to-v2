import { join } from 'node:path';

import glob from 'glob';

function getAppReexports(options) {
  const { projectRoot } = options;

  const filePaths = glob.sync('**/*.js', {
    cwd: join(projectRoot, 'app'),
  });

  return filePaths;
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

  return { appReexports, publicEntrypoints };
}
