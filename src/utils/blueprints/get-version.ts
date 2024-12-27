import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.26.0'],
  ['@babel/eslint-parser', '7.25.9'],
  ['@babel/plugin-transform-typescript', '7.26.3'],
  ['@babel/runtime', '7.26.0'],
  ['@embroider/addon-dev', '7.1.1'],
  ['@embroider/addon-shim', '1.9.0'],
  ['@embroider/test-setup', '4.0.0'],
  ['@glint/core', '1.5.0'],
  ['@glint/environment-ember-loose', '1.5.0'],
  ['@glint/environment-ember-template-imports', '1.5.0'],
  ['@glint/template', '1.5.0'],
  ['@rollup/plugin-babel', '6.0.4'],
  ['@tsconfig/ember', '3.0.8'],
  ['@typescript-eslint/eslint-plugin', '8.18.2'],
  ['@typescript-eslint/parser', '8.18.2'],
  ['babel-plugin-ember-template-compilation', '2.3.0'],
  ['concurrently', '9.1.0'],
  ['decorator-transforms', '2.3.0'],
  ['ember-auto-import', '2.10.0'],
  ['ember-cli-babel', '8.2.0'],
  ['ember-cli-htmlbars', '6.3.0'],
  ['ember-source', '6.1.0'],
  ['ember-template-lint', '6.0.0'],
  ['eslint', '8.57.1'],
  ['eslint-config-prettier', '9.1.0'],
  ['eslint-plugin-ember', '12.3.3'],
  ['eslint-plugin-import', '2.31.0'],
  ['eslint-plugin-n', '17.15.1'],
  ['eslint-plugin-prettier', '5.2.1'],
  ['prettier', '3.4.2'],
  ['rollup', '4.29.1'],
  ['rollup-plugin-copy', '3.5.0'],
  ['typescript', '5.7.2'],
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
