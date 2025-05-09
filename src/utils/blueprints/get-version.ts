import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.27.1'],
  ['@babel/plugin-transform-typescript', '7.27.1'],
  ['@babel/runtime', '7.27.1'],
  ['@embroider/addon-dev', '8.0.1'],
  ['@embroider/addon-shim', '1.10.0'],
  ['@embroider/broccoli-side-watch', '1.1.0'],
  ['@embroider/test-setup', '4.0.0'],
  ['@eslint/js', '9.26.0'],
  ['@glint/core', '1.5.2'],
  ['@glint/environment-ember-loose', '1.5.2'],
  ['@glint/environment-ember-template-imports', '1.5.2'],
  ['@glint/template', '1.5.2'],
  ['@ijlee2-frontend-configs/ember-template-lint', '1.0.0'],
  ['@ijlee2-frontend-configs/eslint-config-ember', '1.0.0'],
  ['@ijlee2-frontend-configs/prettier', '1.0.0'],
  ['@ijlee2-frontend-configs/stylelint', '1.0.0'],
  ['@rollup/plugin-babel', '6.0.4'],
  ['@tsconfig/ember', '3.0.10'],
  ['babel-plugin-ember-template-compilation', '3.0.0'],
  ['concurrently', '9.1.2'],
  ['decorator-transforms', '2.3.0'],
  ['ember-auto-import', '2.10.0'],
  ['ember-cli', '6.4.0'],
  ['ember-cli-babel', '8.2.0'],
  ['ember-cli-htmlbars', '6.3.0'],
  ['ember-source', '6.4.0'],
  ['ember-template-lint', '7.6.0'],
  ['ember-try', '4.0.0'],
  ['eslint', '9.26.0'],
  ['prettier', '3.5.3'],
  ['rollup', '4.40.2'],
  ['rollup-plugin-copy', '3.5.0'],
  ['stylelint', '16.19.1'],
  ['typescript', '5.8.3'],
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
