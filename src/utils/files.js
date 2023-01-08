import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';

function removeDirectoryIfEmpty({ oldPath, projectRoot }) {
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

export function moveFiles(pathMapping, options) {
  const { projectRoot } = options;

  pathMapping.forEach((newPath, oldPath) => {
    const oldAbsolutePath = join(projectRoot, oldPath);

    const newAbsolutePath = join(projectRoot, newPath);
    const newDirectory = dirname(newAbsolutePath);

    if (!existsSync(newDirectory)) {
      mkdirSync(newDirectory, { recursive: true });
    }

    renameSync(oldAbsolutePath, newAbsolutePath);
    removeDirectoryIfEmpty({ oldPath, projectRoot });
  });
}

export function removeFiles(pathMapping, options) {
  const { projectRoot } = options;

  pathMapping.forEach((newPath, oldPath) => {
    const oldAbsolutePath = join(projectRoot, oldPath);

    rmSync(oldAbsolutePath);
    removeDirectoryIfEmpty({ oldPath, projectRoot });
  });
}
