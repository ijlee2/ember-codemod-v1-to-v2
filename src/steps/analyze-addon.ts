import { relative, sep } from 'node:path';

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
      const from = `./${filePath.replaceAll(sep, '/')}`;
      const to = `/${packages.addon.name}/${relative('public', filePath).replaceAll(sep, '/')}`;

      accumulator[from] = to;

      return accumulator;
    },
    {} as Record<string, string>,
  );
}

function hasBlueprints(options: Options): boolean {
  const { projectRoot } = options;

  const filePaths = findFiles('blueprints/**/*', {
    projectRoot,
  });

  return filePaths.length > 0;
}

export function analyzeAddon(options: Options): Context {
  const publicAssets = getPublicAssets(options);

  return {
    addon: {
      hasBlueprints: hasBlueprints(options),
      hasPublicAssets: Object.keys(publicAssets).length > 0,
      publicAssets,
    },
    projectRoot: {
      devDependencies: getProjectRootDevDependencies(options),
    },
  };
}
