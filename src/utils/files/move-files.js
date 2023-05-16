import { renameSync } from 'node:fs';
import { join } from 'node:path';

import { createDirectory } from './create-directory.js';
import { removeDirectoryIfEmpty } from './remove-directory-if-empty.js';

export function moveFiles(filePathMap, options) {
  const { projectRoot } = options;

  filePathMap.forEach((newFilePath, oldFilePath) => {
    const oldPath = join(projectRoot, oldFilePath);
    const newPath = join(projectRoot, newFilePath);

    createDirectory(newPath);
    renameSync(oldPath, newPath);
    removeDirectoryIfEmpty({ oldPath: oldFilePath, projectRoot });
  });
}
