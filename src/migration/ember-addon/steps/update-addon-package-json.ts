import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
  readPackageJson,
} from '@codemod-utils/json';

import type { Context, Options, PackageJson } from '../../../types/index.js';
import { getVersion } from '../../../utils/blueprints.js';

function updateDependencies(packageJson: PackageJson, options: Options): void {
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

  packagesToInstall.sort().forEach((packageName) => {
    const version = getVersion(packageName, options);

    dependencies.set(packageName, version);
  });

  packageJson['dependencies'] = convertToObject(dependencies);
}

function updateDevDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
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
    '@babel/runtime',
    '@embroider/addon-dev',
    '@rollup/plugin-babel',
    '@rollup/plugin-node-resolve',
    'concurrently',
    'rollup',
    'rollup-plugin-copy',
  ]);

  if (packages.addon.hasTypeScript) {
    packagesToInstall.add('@babel/preset-typescript');
  }

  Array.from(packagesToInstall)
    .sort()
    .forEach((packageName) => {
      const version = getVersion(packageName, options);

      devDependencies.set(packageName, version);
    });

  packageJson['devDependencies'] = convertToObject(devDependencies);
}

function updateOtherFields(
  packageJson: PackageJson,
  context: Context,
  options: Options,
): void {
  const { packages } = options;
  const hasPublicAssets = context.addon.publicAssets.length > 0;

  if (hasPublicAssets) {
    const publicAssetMapping = context.addon.publicAssets.reduce(
      (accumulator, filePath) => {
        const from = `./public/${filePath}`;
        const to = `/${packages.addon.name}/${filePath}`;

        accumulator[from] = to;

        return accumulator;
      },
      {} as Record<string, string>,
    );

    packageJson['ember-addon'] = {
      'app-js': {},
      main: 'addon-main.cjs',
      'public-assets': publicAssetMapping,
      type: 'addon',
      version: 2,
    };
  } else {
    packageJson['ember-addon'] = {
      'app-js': {},
      main: 'addon-main.cjs',
      type: 'addon',
      version: 2,
    };
  }

  if (packages.addon.hasTypeScript) {
    packageJson['exports'] = {
      '.': {
        types: './declarations/index.d.ts',
        default: './dist/index.js',
      },
      './*': {
        /*
          This object has an order dependency. The `default` key must appear last.
        */
        types: './declarations/*.d.ts',
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

  const files = new Set(['addon-main.cjs', 'dist']);

  if (hasPublicAssets) {
    files.add('public');
  }

  if (packages.addon.hasTypeScript) {
    files.add('declarations');
  }

  packageJson['files'] = Array.from(files).sort();

  if (packages.addon.hasTypeScript) {
    packageJson['typesVersions'] = {
      '*': {
        '*': ['declarations/*'],
      },
    };
  }
}

function updateScripts(packageJson: PackageJson, options: Options): void {
  const { packages } = options;

  const scripts = convertToMap(packageJson['scripts']);

  if (packages.addon.hasTypeScript) {
    scripts.set('build', 'concurrently "npm:build:*" --names "build:"');
    scripts.set('build:js', 'rollup --config');
    scripts.set(
      'build:types',
      packages.addon.hasGlint ? 'glint --declaration' : 'tsc',
    );

    scripts.set(
      'lint:types',
      packages.addon.hasGlint
        ? 'glint'
        : 'tsc --emitDeclarationOnly false --noEmit',
    );

    scripts.set('prepack', 'rollup --config');

    scripts.set('start', 'concurrently "npm:start:*" --names "start:"');
    scripts.set('start:js', 'rollup --config --watch --no-watch.clearScreen');
    scripts.set(
      'start:types',
      packages.addon.hasGlint ? 'glint --declaration --watch' : 'tsc --watch',
    );

    scripts.set(
      'test',
      "echo 'A v2 addon does not have tests, run tests in test-app'",
    );
  } else {
    scripts.set('build', 'rollup --config');
    scripts.set('prepack', 'rollup --config');
    scripts.set('start', 'rollup --config --watch');
    scripts.set(
      'test',
      "echo 'A v2 addon does not have tests, run tests in test-app'",
    );
  }

  packageJson['scripts'] = convertToObject(scripts);
}

export function updateAddonPackageJson(
  context: Context,
  options: Options,
): void {
  const { locations, projectRoot } = options;

  const packageJson = readPackageJson({
    projectRoot: join(projectRoot, locations.addon),
  });

  updateDependencies(packageJson, options);
  updateDevDependencies(packageJson, options);
  updateScripts(packageJson, options);
  updateOtherFields(packageJson, context, options);

  const destination = join(projectRoot, locations.addon, 'package.json');
  const file = JSON.stringify(packageJson, null, 2) + '\n';

  writeFileSync(destination, file, 'utf8');
}
