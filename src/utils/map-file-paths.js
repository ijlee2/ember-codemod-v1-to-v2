function changeDirectory(oldPath, from, to) {
  if (!oldPath.startsWith(from)) {
    throw new RangeError(
      `The provided path \`${oldPath}\` does not start with \`${from}\`.`
    );
  }

  const relativePath = oldPath.replace(new RegExp(`^${from}/`), '');
  const newPath = `${to}/${relativePath}`;

  return [oldPath, newPath];
}

export function mapFilePaths(filePaths, directory) {
  const { from, to } = directory;

  return new Map(
    filePaths.map((filePath) => changeDirectory(filePath, from, to))
  );
}
