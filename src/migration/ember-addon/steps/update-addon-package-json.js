import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { decideVersion } from '../../../utils/blueprints.js';
import { convertToMap, convertToObject } from '../../../utils/json.js';

function updateDependencies(packageJson, options) {
  const dependencies = convertToMap(packageJson['dependencies']);

  const packagesToDelete = [
    '@embroider/macros',
    'ember-auto-import',
    'ember-cli-babel',
    'ember-cli-htmlbars',
  ];

  packagesToDelete.forEach((packageName) => {
    dependencies.delete(packageName);
  });

  const packagesToInstall = ['@embroider/addon-shim'];

  packagesToInstall.forEach((packageName) => {
    const version = decideVersion(packageName, options);

    dependencies.set(packageName, version);
  });

  packageJson['dependencies'] = convertToObject(dependencies);
}

function updateDevDependencies(packageJson, options) {
  const { packages } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  /*
    For the time being, we'll take the approach of starting over and
    adding back the development dependencies that are required. For
    a more conservative approach, we could delete only the following:

      - @embroider/macros
      - ember-auto-import
      - ember-cli-babel
      - ember-cli-htmlbars
  */
  devDependencies.clear();

  const packagesToInstall = new Set([
    '@babel/core',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-decorators',
    '@embroider/addon-dev',
    '@rollup/plugin-babel',
    'rollup',
    'rollup-plugin-copy',
  ]);

  if (packages.addon.hasTypeScript) {
    packagesToInstall.add('@babel/preset-typescript');
    packagesToInstall.add('rollup-plugin-ts');
    packagesToInstall.delete('@rollup/plugin-babel');
  }

  [...packagesToInstall].sort().forEach((packageName) => {
    const version = decideVersion(packageName, options);

    devDependencies.set(packageName, version);
  });

  packageJson['devDependencies'] = convertToObject(devDependencies);
}

function updateOtherFields(packageJson, options) {
  const { packages } = options;

  packageJson['ember-addon'] = {
    'app-js': {},
    main: 'addon-main.cjs',
    type: 'addon',
    version: 2,
  };

  if (packages.addon.hasTypeScript) {
    packageJson['exports'] = {
      '.': './dist/index.js',
      './*': {
        types: './dist/*.d.ts',
        default: './dist/*.js',
      },
      './addon-main.js': './addon-main.cjs',
    };
  } else {
    packageJson['exports'] = {
      '.': './dist/index.js',
      './*': './dist/*.js',
      './addon-main.js': './addon-main.cjs',
    };
  }

  packageJson['files'] = ['addon-main.cjs', 'dist'];

  if (packages.addon.hasTypeScript) {
    packageJson['typesVersions'] = {
      '*': {
        '*': ['dist/*'],
      },
    };
  }
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

  updateDependencies(packageJson, options);
  updateDevDependencies(packageJson, options);
  updateScripts(packageJson);
  updateOtherFields(packageJson, options);

  const newFile = JSON.stringify(packageJson, null, 2) + '\n';

  writeFileSync(oldPath, newFile, 'utf8');
}
