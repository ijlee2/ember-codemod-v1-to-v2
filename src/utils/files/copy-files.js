import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

export function copyFiles(pathMapping, options) {
  const { projectRoot } = options;

  pathMapping.forEach((newPath, oldPath) => {
    const oldAbsolutePath = join(projectRoot, oldPath);

    const newAbsolutePath = join(projectRoot, newPath);
    const newDirectory = dirname(newAbsolutePath);

    if (!existsSync(newDirectory)) {
      mkdirSync(newDirectory, { recursive: true });
    }

    copyFileSync(oldAbsolutePath, newAbsolutePath);
  });
}
