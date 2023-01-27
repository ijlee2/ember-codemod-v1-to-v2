import { join } from 'node:path';

function renameDirectory(oldPath, { from, to }) {
  if (from === '') {
    return join(to, oldPath);
  }

  if (!oldPath.startsWith(`${from}/`)) {
    return oldPath;
  }

  return join(to, oldPath.replace(`${from}/`, ''));
}

export function mapFilePaths(filePaths, directory) {
  const { from, to } = directory;

  return new Map(
    filePaths.map((filePath) => {
      const newPath = renameDirectory(filePath, { from, to });

      return [filePath, newPath];
    })
  );
}
