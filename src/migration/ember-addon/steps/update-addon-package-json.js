import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
} from '../../../utils/convert-json-object.js';
import { decideVersion } from '../../../utils/decide-version.js';

function updateDependencies(packageJson) {
  const dependencies = convertToMap(packageJson['dependencies']);

  const packagesToDelete = [
    '@embroider/macros',
    'ember-auto-import',
    'ember-cli-babel',
    'ember-cli-htmlbars',
  ];

  const packagesToInstall = ['@embroider/addon-shim'];

  packagesToDelete.forEach((packageName) => {
    dependencies.delete(packageName);
  });

  packagesToInstall.forEach((packageName) => {
    const version = decideVersion(packageName, dependencies);

    dependencies.set(packageName, version);
  });

  packageJson['dependencies'] = convertToObject(dependencies);
}

function updateDevDependencies(packageJson, options) {
  const { packages } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  const packagesToDelete = [
    '@embroider/macros',
    'ember-auto-import',
    'ember-cli-babel',
    'ember-cli-htmlbars',
  ];

  const packagesToInstall = packages.addon.hasTypeScript
    ? [
        '@babel/core',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-decorators',
        '@babel/preset-typescript',
        '@embroider/addon-dev',
        'rollup',
        'rollup-plugin-copy',
        'rollup-plugin-ts',
      ]
    : [
        '@babel/core',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-decorators',
        '@embroider/addon-dev',
        '@rollup/plugin-babel',
        'rollup',
        'rollup-plugin-copy',
      ];

  // May be easier to start over and add missing dependencies
  devDependencies.clear();

  packagesToDelete.forEach((packageName) => {
    devDependencies.delete(packageName);
  });

  packagesToInstall.forEach((packageName) => {
    const version = decideVersion(packageName, devDependencies);

    devDependencies.set(packageName, version);
  });

  packageJson['devDependencies'] = convertToObject(devDependencies);
}

function updateOtherFields(packageJson) {
  packageJson['ember-addon'] = {
    'app-js': {},
    main: 'addon-main.js',
    type: 'addon',
    version: 2,
  };

  packageJson['exports'] = {
    '.': './dist/index.js',
    './*': './dist/*.js',
    './addon-main.js': './addon-main.js',
  };

  packageJson['files'] = ['addon-main.js', 'dist'];
}

function updateScripts(packageJson) {
  const scripts = convertToMap(packageJson.scripts);

  scripts.set('build', 'rollup --config');
  scripts.set('prepack', 'rollup --config');
  scripts.set('start', 'rollup --config --watch');
  scripts.set(
    'test',
    "echo 'A v2 addon does not have tests, run tests in test-app'"
  );

  packageJson['scripts'] = convertToObject(scripts);
}

export function updateAddonPackageJson(options) {
  const { locations, projectRoot } = options;

  const oldPath = join(projectRoot, locations.addon, 'package.json');
  const oldFile = readFileSync(oldPath, 'utf8');
  const packageJson = JSON.parse(oldFile);

  updateDependencies(packageJson);
  updateDevDependencies(packageJson, options);
  updateScripts(packageJson);
  updateOtherFields(packageJson);

  const newFile = JSON.stringify(packageJson, null, 2) + '\n';

  writeFileSync(oldPath, newFile, 'utf8');
}
