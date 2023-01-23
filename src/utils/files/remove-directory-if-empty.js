import { readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';

export function removeDirectoryIfEmpty({ oldPath, projectRoot }) {
  const directories = dirname(oldPath).split('/');
  const depth = directories.length;

  for (let i = 0; i < depth; i++) {
    const directory = join(projectRoot, ...directories);
    const numFilesLeft = readdirSync(directory).length;

    if (numFilesLeft > 0) {
      continue;
    }

    rmSync(directory, { recursive: true });
    directories.pop();
  }
}
