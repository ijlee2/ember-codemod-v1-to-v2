import {
  copyFiles,
  findFiles,
  mapFilePaths,
  moveFiles,
  removeFiles,
  unionize,
} from '@codemod-utils/files';

function copyToAddon(options) {
  const { locations, projectRoot } = options;

  const files = ['LICENSE.md', 'README.md'];

  const filePaths = findFiles(unionize(files), {
    projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: '',
    to: locations.addon,
  });

  copyFiles(filePathMap, options);
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

  const filePaths = findFiles(unionize([...files]), {
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

function moveToTestApp(options) {
  const { locations, projectRoot } = options;

  const files = [
    '.ember-cli',
    '.watchmanconfig',
    'ember-cli-build.js',
    'testem.js',
  ];

  const filePaths = findFiles(unionize(files), {
    projectRoot,
  });

  const filePathMap = mapFilePaths(filePaths, {
    from: '',
    to: locations.testApp,
  });

  moveFiles(filePathMap, options);
}

function removeFromProjectRoot(options) {
  const { projectRoot } = options;

  const files = ['.npmignore', 'index.js'];

  const filePaths = findFiles(unionize(files), {
    projectRoot,
  });

  removeFiles(filePaths, options);
}

export function moveProjectRootFiles(options) {
  copyToAddon(options);
  moveToAddonAndTestApp(options);
  moveToTestApp(options);
  removeFromProjectRoot(options);
}
