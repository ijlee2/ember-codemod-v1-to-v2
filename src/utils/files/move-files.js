import { existsSync, mkdirSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { removeDirectoryIfEmpty } from './remove-directory-if-empty.js';

export function moveFiles(pathMapping, options) {
  const { projectRoot } = options;

  pathMapping.forEach((newPath, oldPath) => {
    const oldAbsolutePath = join(projectRoot, oldPath);

    const newAbsolutePath = join(projectRoot, newPath);
    const newDirectory = dirname(newAbsolutePath);

    if (!existsSync(newDirectory)) {
      mkdirSync(newDirectory, { recursive: true });
    }

    renameSync(oldAbsolutePath, newAbsolutePath);
    removeDirectoryIfEmpty({ oldPath, projectRoot });
  });
}
