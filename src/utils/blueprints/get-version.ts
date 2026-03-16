import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.29.0'],
  ['@babel/plugin-transform-typescript', '7.28.6'],
  ['@babel/runtime', '7.28.6'],
  ['@embroider/addon-dev', '8.3.0'],
  ['@embroider/addon-shim', '1.10.2'],
  ['@embroider/broccoli-side-watch', '1.1.0'],
  ['@embroider/test-setup', '4.0.0'],
  ['@glimmer/component', '2.0.0'],
  ['@glimmer/tracking', '1.1.2'],
  ['@glint/ember-tsc', '1.2.3'],
  ['@glint/template', '1.7.7'],
  ['@glint/tsserver-plugin', '2.2.4'],
  ['@ijlee2-frontend-configs/ember-template-lint', '3.0.0'],
  ['@ijlee2-frontend-configs/eslint-config-ember', '3.1.0'],
  ['@ijlee2-frontend-configs/prettier', '3.0.1'],
  ['@ijlee2-frontend-configs/stylelint', '3.1.0'],
  ['@rollup/plugin-babel', '7.0.0'],
  ['@tsconfig/ember', '3.0.12'],
  ['babel-plugin-ember-template-compilation', '4.0.0'],
  ['concurrently', '9.2.1'],
  ['decorator-transforms', '2.3.1'],
  ['ember-auto-import', '2.12.1'],
  ['ember-cli', '6.11.0'],
  ['ember-cli-babel', '8.3.1'],
  ['ember-cli-htmlbars', '7.0.0'],
  ['ember-modifier', '4.3.0'],
  ['ember-source', '6.11.0'],
  ['ember-template-imports', '4.4.0'],
  ['ember-template-lint', '7.9.3'],
  ['ember-try', '4.0.0'],
  ['eslint', '9.39.4'],
  ['pnpm', '10.32.1'],
  ['prettier', '3.8.1'],
  ['rollup', '4.59.0'],
  ['stylelint', '17.4.0'],
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
