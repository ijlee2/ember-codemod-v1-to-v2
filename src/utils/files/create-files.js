import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { createDirectory } from './create-directory.js';

export function createFiles(fileMap, options) {
  const { projectRoot } = options;

  fileMap.forEach((file, filePath) => {
    const path = join(projectRoot, filePath);

    createDirectory(path);
    writeFileSync(path, file, 'utf8');
  });
}
