import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.26.0'],
  ['@babel/plugin-transform-typescript', '7.26.5'],
  ['@babel/runtime', '7.26.0'],
  ['@embroider/addon-dev', '7.1.1'],
  ['@embroider/addon-shim', '1.9.0'],
  ['@embroider/broccoli-side-watch', '1.0.1'],
  ['@embroider/test-setup', '4.0.0'],
  ['@eslint/js', '9.23.0'],
  ['@glint/core', '1.5.2'],
  ['@glint/environment-ember-loose', '1.5.2'],
  ['@glint/environment-ember-template-imports', '1.5.2'],
  ['@glint/template', '1.5.2'],
  ['@ijlee2-frontend-configs/ember-template-lint', '0.5.2'],
  ['@ijlee2-frontend-configs/eslint-config-ember', '0.4.0'],
  ['@ijlee2-frontend-configs/prettier', '0.2.3'],
  ['@ijlee2-frontend-configs/stylelint', '0.2.3'],
  ['@ijlee2-frontend-configs/typescript', '0.4.0'],
  ['@rollup/plugin-babel', '6.0.4'],
  ['babel-plugin-ember-template-compilation', '2.3.0'],
  ['concurrently', '9.1.2'],
  ['decorator-transforms', '2.3.0'],
  ['ember-auto-import', '2.10.0'],
  ['ember-cli', '6.2.0'],
  ['ember-cli-babel', '8.2.0'],
  ['ember-cli-htmlbars', '6.3.0'],
  ['ember-source', '6.2.0'],
  ['ember-template-lint', '7.0.1'],
  ['ember-try', '4.0.0'],
  ['eslint', '9.23.0'],
  ['prettier', '3.5.3'],
  ['rollup', '4.30.1'],
  ['rollup-plugin-copy', '3.5.0'],
  ['stylelint', '16.16.0'],
  ['typescript', '5.8.2'],
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
