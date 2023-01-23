import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export function createFiles(fileMapping, options) {
  const { projectRoot } = options;

  fileMapping.forEach((file, newPath) => {
    const newAbsolutePath = join(projectRoot, newPath);
    const newDirectory = dirname(newAbsolutePath);

    if (!existsSync(newDirectory)) {
      mkdirSync(newDirectory, { recursive: true });
    }

    writeFileSync(newAbsolutePath, file, 'utf8');
  });
}
