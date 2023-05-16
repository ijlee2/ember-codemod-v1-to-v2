import { renameSync } from 'node:fs';
import { join } from 'node:path';

import { createDirectory } from './create-directory.js';
import { removeDirectoryIfEmpty } from './remove-directory-if-empty.js';

export function moveFiles(pathMapping, options) {
  const { projectRoot } = options;

  pathMapping.forEach((newPath, oldPath) => {
    const oldAbsolutePath = join(projectRoot, oldPath);
    const newAbsolutePath = join(projectRoot, newPath);

    createDirectory(newAbsolutePath);
    renameSync(oldAbsolutePath, newAbsolutePath);
    removeDirectoryIfEmpty({ oldPath, projectRoot });
  });
}
