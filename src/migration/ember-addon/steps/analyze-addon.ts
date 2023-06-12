import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

import type { Context, Options } from '../../../types/index.js';
import { getVersion } from '../../../utils/blueprints.js';

function getAppReexports(options: Options): string[] {
  const { projectRoot } = options;

  const filePaths = findFiles('app/**/*.js', {
    projectRoot,
  });

  return filePaths
    .map((filePath) => {
      return renamePathByDirectory(filePath, {
        from: 'app',
        to: '',
      });
    })
    .sort();
}

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

  return filePaths
    .map((filePath) => {
      return renamePathByDirectory(filePath, {
        from: 'public',
        to: '',
      });
    })
    .sort();
}

function getPublicEntrypoints(options: Options): string[] {
  const { projectRoot } = options;

  const filePaths = findFiles('{addon,addon-test-support}/**/*.{js,ts}', {
    projectRoot,
  });

  return filePaths
    .map((filePath) => {
      return renamePathByDirectory(filePath, {
        from: 'addon',
        to: '',
      });
    })
    .map((filePath) => {
      return renamePathByDirectory(filePath, {
        from: 'addon-test-support',
        to: 'test-support',
      });
    })
    .map((filePath) => {
      return filePath.replace(/ts$/, 'js');
    })
    .sort();
}

export function analyzeAddon(options: Options): Context {
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
