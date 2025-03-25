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

  const files = ['package.json'];

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
    '.gitignore',
    '.watchmanconfig',
    'ember-cli-build.js',
    'testem.js',
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

  const files = [
    '.eslintignore',
    '.eslintrc.{cjs,js}',
    '.npmignore',
    '.prettierignore',
    '.prettierrc.{cjs,js}',
    '.stylelintignore',
    '.stylelintrc.{cjs,js,mjs}',
    '.template-lintrc.{cjs,js}',
    'eslint.config.mjs',
    'index.js',
    'prettier.config.mjs',
    'tsconfig.json',
  ];

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
