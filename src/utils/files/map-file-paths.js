import { join } from 'node:path';

export function renameDirectory(oldFilePath, { from, to }) {
  if (from === '') {
    return join(to, oldFilePath);
  }

  if (!oldFilePath.startsWith(`${from}/`)) {
    return oldFilePath;
  }

  return join(to, oldFilePath.replace(`${from}/`, ''));
}

export function mapFilePaths(filePaths, { from, to }) {
  return new Map(
    filePaths.map((oldFilePath) => {
      const newFilePath = renameDirectory(oldFilePath, { from, to });

      return [oldFilePath, newFilePath];
    }),
  );
}
