import { globSync } from 'glob';

export function findFiles(pattern, { cwd, ignoreList = [], matchFilesOnly }) {
  if (!pattern) {
    throw new RangeError('ERROR: The glob pattern is unknown.\n');
  }

  if (!cwd) {
    throw new RangeError('ERROR: The current working directory is unknown.\n');
  }

  let options;

  if (matchFilesOnly) {
    options = {
      cwd,
      dot: true,
      ignore: ignoreList,
      nodir: true,
    };
  } else {
    options = {
      cwd,
      ignore: ignoreList,
    };
  }

  const filePaths = globSync(pattern, options);

  return filePaths;
}
