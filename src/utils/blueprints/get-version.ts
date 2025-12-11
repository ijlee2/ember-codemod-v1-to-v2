import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.28.5'],
  ['@babel/plugin-transform-typescript', '7.28.5'],
  ['@babel/runtime', '7.28.4'],
  ['@embroider/addon-dev', '8.1.2'],
  ['@embroider/addon-shim', '1.10.2'],
  ['@embroider/broccoli-side-watch', '1.1.0'],
  ['@embroider/test-setup', '4.0.0'],
  ['@glimmer/component', '2.0.0'],
  ['@glimmer/tracking', '1.1.2'],
  ['@glint/ember-tsc', '1.0.8'],
  ['@glint/template', '1.7.3'],
  ['@glint/tsserver-plugin', '2.0.8'],
  ['@ijlee2-frontend-configs/ember-template-lint', '2.3.0'],
  ['@ijlee2-frontend-configs/eslint-config-ember', '2.4.2'],
  ['@ijlee2-frontend-configs/prettier', '2.3.1'],
  ['@ijlee2-frontend-configs/stylelint', '2.2.0'],
  ['@rollup/plugin-babel', '6.1.0'],
  ['@tsconfig/ember', '3.0.12'],
  ['babel-plugin-ember-template-compilation', '3.0.1'],
  ['concurrently', '9.2.1'],
  ['decorator-transforms', '2.3.0'],
  ['ember-auto-import', '2.12.0'],
  ['ember-cli', '6.8.1'],
  ['ember-cli-babel', '8.2.0'],
  ['ember-cli-htmlbars', '7.0.0'],
  ['ember-modifier', '4.2.2'],
  ['ember-source', '6.8.2'],
  ['ember-template-imports', '4.3.0'],
  ['ember-template-lint', '7.9.3'],
  ['ember-try', '4.0.0'],
  ['eslint', '9.39.1'],
  ['prettier', '3.7.4'],
  ['rollup', '4.53.3'],
  ['stylelint', '16.26.1'],
  ['typescript', '5.9.3'],
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
