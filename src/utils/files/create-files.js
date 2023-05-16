import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { createDirectory } from './create-directory.js';

export function createFiles(fileMapping, options) {
  const { projectRoot } = options;

  fileMapping.forEach((file, newPath) => {
    const newAbsolutePath = join(projectRoot, newPath);

    createDirectory(newAbsolutePath);
    writeFileSync(newAbsolutePath, file, 'utf8');
  });
}
