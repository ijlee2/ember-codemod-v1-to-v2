import { globSync } from 'glob';

export function findFiles(pattern, { cwd, ignoreList = [] }) {
  if (!pattern) {
    throw new RangeError('ERROR: The glob pattern is unknown.\n');
  }

  if (!cwd) {
    throw new RangeError('ERROR: The current working directory is unknown.\n');
  }

  const filePaths = globSync(pattern, {
    cwd,
    dot: true,
    ignore: ignoreList,
    nodir: true,
  });

  return filePaths;
}
