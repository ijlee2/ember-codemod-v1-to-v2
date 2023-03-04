import { globSync } from 'glob';

import {
  copyFiles,
  mapFilePaths,
  moveFiles,
  removeFiles,
} from '../../../utils/files.js';

function globPattern(files) {
  if (files.length <= 1) {
    return files.join(',');
  }

  return `{${files.join(',')}}`;
}

function copyToAddon(options) {
  const { locations, projectRoot } = options;

  const files = ['LICENSE.md', 'README.md'];

  const filePaths = globSync(globPattern(files), {
    cwd: projectRoot,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: '',
    to: locations.addon,
  });

  copyFiles(pathMapping, options);
}

function moveToAddonAndTestApp(options) {
  const { locations, packages, projectRoot } = options;

  const files = new Set([
    '.eslintignore',
    '.eslintrc.cjs',
    '.eslintrc.js',
    '.gitignore',
    '.prettierignore',
    '.prettierrc.cjs',
    '.prettierrc.js',
    '.stylelintignore',
    '.stylelintrc.cjs',
    '.stylelintrc.js',
    '.template-lintrc.cjs',
    '.template-lintrc.js',
    'package.json',
  ]);

  if (packages.addon.hasTypeScript) {
    files.add('tsconfig.json');
  }

  const filePaths = globSync(globPattern([...files]), {
    cwd: projectRoot,
  });

  let pathMapping = mapFilePaths(filePaths, {
    from: '',
    to: locations.addon,
  });

  copyFiles(pathMapping, options);

  pathMapping = mapFilePaths(filePaths, {
    from: '',
    to: locations.testApp,
  });

  copyFiles(pathMapping, options);

  removeFiles(filePaths, options);
}

function moveToTestApp(options) {
  const { locations, projectRoot } = options;

  const files = [
    '.ember-cli',
    '.watchmanconfig',
    'ember-cli-build.js',
    'testem.js',
  ];

  const filePaths = globSync(globPattern(files), {
    cwd: projectRoot,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: '',
    to: locations.testApp,
  });

  moveFiles(pathMapping, options);
}

function removeFromProjectRoot(options) {
  const { projectRoot } = options;

  const files = ['.npmignore', 'index.js'];

  const filePaths = globSync(globPattern(files), {
    cwd: projectRoot,
  });

  removeFiles(filePaths, options);
}

export function moveProjectRootFiles(options) {
  copyToAddon(options);
  moveToAddonAndTestApp(options);
  moveToTestApp(options);
  removeFromProjectRoot(options);
}
