import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.24.7'],
  ['@babel/eslint-parser', '7.24.7'],
  ['@babel/plugin-transform-typescript', '7.24.7'],
  ['@babel/runtime', '7.24.7'],
  ['@embroider/addon-dev', '4.3.1'],
  ['@embroider/addon-shim', '1.8.9'],
  ['@embroider/test-setup', '4.0.0'],
  ['@glint/core', '1.4.0'],
  ['@glint/environment-ember-loose', '1.4.0'],
  ['@glint/template', '1.4.0'],
  ['@rollup/plugin-babel', '6.0.4'],
  ['@tsconfig/ember', '3.0.8'],
  ['@types/ember__component', '4.0.22'],
  ['@types/ember__object', '4.0.12'],
  ['@types/ember__service', '4.0.9'],
  ['@typescript-eslint/eslint-plugin', '7.12.0'],
  ['@typescript-eslint/parser', '7.12.0'],
  ['babel-plugin-ember-template-compilation', '2.2.5'],
  ['concurrently', '8.2.2'],
  ['decorator-transforms', '2.0.0'],
  ['ember-auto-import', '2.7.3'],
  ['ember-cli-babel', '8.1.0'],
  ['ember-cli-htmlbars', '6.3.0'],
  ['ember-template-lint', '6.0.0'],
  ['eslint', '8.57.0'],
  ['eslint-config-prettier', '9.1.0'],
  ['eslint-plugin-ember', '12.1.1'],
  ['eslint-plugin-import', '2.29.1'],
  ['eslint-plugin-n', '17.8.1'],
  ['eslint-plugin-prettier', '5.1.3'],
  ['prettier', '3.3.1'],
  ['rollup', '4.18.0'],
  ['rollup-plugin-copy', '3.5.0'],
  ['typescript', '5.4.5'],
]);

export function getLatestVersion(packageName: string): string {
  if (!latestVersions.has(packageName)) {
    throw new RangeError(
      `ERROR: The latest version of \`${packageName}\` is unknown.\n`,
    );
  }

  return `^${latestVersions.get(packageName)}`;
}

export function getVersion(packageName: string, options: Options): string {
  const { packages } = options;

  return decideVersion(packageName, {
    dependencies: packages.addon.dependencies,
    latestVersions,
  });
}
