import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import { getVersion } from '../utils/blueprints.js';

function getProjectRootDevDependencies(
  options: Options,
): Record<string, string> {
  return {
    concurrently: getVersion('concurrently', options),
  };
}

function getPublicAssets(options: Options): string[] {
  const { projectRoot } = options;

  const filePaths = findFiles('public/**/*', {
    projectRoot,
  });

  return filePaths.map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'public',
      to: '',
    });
  });
}

export function analyzeAddon(options: Options): Context {
  return {
    addon: {
      publicAssets: getPublicAssets(options),
    },
    projectRoot: {
      devDependencies: getProjectRootDevDependencies(options),
    },
  };
}
