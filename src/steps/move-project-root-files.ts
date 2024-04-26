import {
  copyFiles,
  findFiles,
  mapFilePaths,
  moveFiles,
  removeFiles,
} from '@codemod-utils/files';

import type { Options } from '../types/index.js';

function copyToAddon(options: Options): void {
  const { locations, projectRoot } = options;

  const files = ['LICENSE.md', 'README.md'];

  const filePaths = findFiles(files, {
    projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: '',
    to: locations.addon,
  });

  copyFiles(filePathMap, options);
}

function moveToAddonAndTestApp(options: Options): void {
  const { locations, projectRoot } = options;

  const files = ['.stylelintignore', '.stylelintrc.{cjs,js}', 'package.json'];

  const filePaths = findFiles(files, {
    projectRoot,
  });

  let filePathMap = mapFilePaths(filePaths, {
    from: '',
    to: locations.addon,
  });

  copyFiles(filePathMap, options);

  filePathMap = mapFilePaths(filePaths, {
    from: '',
    to: locations.testApp,
  });

  copyFiles(filePathMap, options);

  removeFiles(filePaths, options);
}

function moveToTestApp(options: Options): void {
  const { locations, projectRoot } = options;

  const files = [
    '.ember-cli',
    '.eslintignore',
    '.eslintrc.{cjs,js}',
    '.gitignore',
    '.prettierignore',
    '.prettierrc.{cjs,js}',
    '.template-lintrc.{cjs,js}',
    '.watchmanconfig',
    'ember-cli-build.js',
    'testem.js',
    'tsconfig.json',
  ];

  const filePaths = findFiles(files, {
    projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: '',
    to: locations.testApp,
  });

  moveFiles(filePathMap, options);
}

function removeFromProjectRoot(options: Options): void {
  const { projectRoot } = options;

  const files = ['.npmignore', 'index.js'];

  const filePaths = findFiles(files, {
    projectRoot,
  });

  removeFiles(filePaths, options);
}

export function moveProjectRootFiles(options: Options): void {
  copyToAddon(options);
  moveToAddonAndTestApp(options);
  moveToTestApp(options);
  removeFromProjectRoot(options);
}
