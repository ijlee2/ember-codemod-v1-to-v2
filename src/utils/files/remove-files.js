import { rmSync } from 'node:fs';
import { join } from 'node:path';

import { removeDirectoryIfEmpty } from './remove-directory-if-empty.js';

export function removeFiles(oldPaths, options) {
  const { projectRoot } = options;

  oldPaths.forEach((oldPath) => {
    const oldAbsolutePath = join(projectRoot, oldPath);

    rmSync(oldAbsolutePath);
    removeDirectoryIfEmpty(oldPath, options);
  });
}
