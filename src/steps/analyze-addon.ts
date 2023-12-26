import { findFiles } from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import { getVersion } from '../utils/blueprints.js';

function getProjectRootDevDependencies(
  options: Options,
): Record<string, string> {
  return {
    concurrently: getVersion('concurrently', options),
  };
}

function getPublicAssets(options: Options): Record<string, string> {
  const { packages, projectRoot } = options;

  const filePaths = findFiles('public/**/*', {
    projectRoot,
  });

  return filePaths.reduce(
    (accumulator, filePath) => {
      const from = `./${filePath}`;
      const to = `/${packages.addon.name}/${filePath.replace(/^public\//, '')}`;

      accumulator[from] = to;

      return accumulator;
    },
    {} as Record<string, string>,
  );
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
