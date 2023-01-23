import { rmSync } from 'node:fs';
import { join } from 'node:path';

import { removeDirectoryIfEmpty } from './remove-directory-if-empty.js';

export function removeFiles(pathMapping, options) {
  const { projectRoot } = options;

  pathMapping.forEach((newPath, oldPath) => {
    const oldAbsolutePath = join(projectRoot, oldPath);

    rmSync(oldAbsolutePath);
    removeDirectoryIfEmpty({ oldPath, projectRoot });
  });
}
