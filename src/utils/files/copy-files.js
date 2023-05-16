import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

import { createDirectory } from './create-directory.js';

export function copyFiles(filePathMap, options) {
  const { projectRoot } = options;

  filePathMap.forEach((newFilePath, oldFilePath) => {
    const oldPath = join(projectRoot, oldFilePath);
    const newPath = join(projectRoot, newFilePath);

    createDirectory(newPath);
    copyFileSync(oldPath, newPath);
  });
}
