import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  addonLocation: undefined,
  projectRoot: 'tmp/ember-container-query-javascript',
  testAppLocation: undefined,
  testAppName: undefined,
};

const context: Context = {
  addon: {
    publicAssets: {},
  },
  projectRoot: {
    devDependencies: {
      concurrently: '^7.6.0',
    },
  },
};

const options: Options = {
  locations: {
    addon: 'ember-container-query',
    testApp: 'test-app',
  },
  packageManager: {
    isNpm: false,
    isPnpm: false,
    isYarn: true,
  },
  packages: {
    addon: {
      dependencies: new Map([
        ['ember-cli-babel', '^7.26.11'],
        ['ember-cli-htmlbars', '^6.1.1'],
        ['ember-element-helper', '^0.6.1'],
        ['ember-modifier', '^3.2.7'],
        ['ember-resize-observer-service', '^1.1.0'],
        ['ember-test-selectors', '^6.0.0'],
        ['@babel/eslint-parser', '^7.19.1'],
        ['@babel/plugin-proposal-decorators', '^7.20.7'],
        ['@ember/optional-features', '^2.0.0'],
        ['@ember/test-helpers', '^2.9.3'],
        ['@embroider/test-setup', '^2.0.2'],
        ['@glimmer/component', '^1.1.2'],
        ['@glimmer/tracking', '^1.1.2'],
        ['@percy/cli', '^1.16.0'],
        ['@percy/ember', '^4.0.0'],
        ['broccoli-asset-rev', '^3.0.0'],
        ['concurrently', '^7.6.0'],
        ['d3-array', '^3.2.1'],
        ['d3-axis', '^3.0.0'],
        ['d3-scale', '^4.0.2'],
        ['d3-selection', '^3.0.0'],
        ['d3-shape', '^3.2.0'],
        ['ember-a11y-refocus', '^3.0.2'],
        ['ember-a11y-testing', '^5.1.0'],
        ['ember-auto-import', '^2.5.0'],
        ['ember-cli', '~4.9.2'],
        ['ember-cli-dependency-checker', '^3.3.1'],
        ['ember-cli-dependency-lint', '^2.0.1'],
        ['ember-cli-inject-live-reload', '^2.1.0'],
        ['ember-cli-netlify', '^0.4.1'],
        ['ember-cli-sri', '^2.1.1'],
        ['ember-cli-terser', '^4.0.2'],
        ['ember-css-modules', '^2.0.1'],
        ['ember-load-initializers', '^2.1.2'],
        ['ember-page-title', '^7.0.0'],
        ['ember-qunit', '^6.1.1'],
        ['ember-resolver', '^9.0.1'],
        ['ember-source', '~4.9.3'],
        ['ember-source-channel-url', '^3.0.0'],
        ['ember-svg-jar', '^2.4.2'],
        ['ember-template-lint', '^5.3.0'],
        ['ember-template-lint-plugin-prettier', '^4.1.0'],
        ['ember-truth-helpers', '^3.1.1'],
        ['ember-try', '^2.0.0'],
        ['eslint', '^8.31.0'],
        ['eslint-config-prettier', '^8.6.0'],
        ['eslint-plugin-ember', '^11.4.2'],
        ['eslint-plugin-n', '^15.6.0'],
        ['eslint-plugin-prettier', '^4.2.1'],
        ['eslint-plugin-qunit', '^7.3.4'],
        ['eslint-plugin-simple-import-sort', '^8.0.0'],
        ['lerna-changelog', '^2.2.0'],
        ['loader.js', '^4.7.0'],
        ['prettier', '^2.8.1'],
        ['qunit', '^2.19.3'],
        ['qunit-dom', '^2.0.0'],
        ['stylelint', '^14.16.1'],
        ['stylelint-config-standard', '^29.0.0'],
        ['stylelint-no-unsupported-browser-features', '^6.0.1'],
        ['stylelint-order', '^6.0.0'],
        ['webpack', '^5.75.0'],
      ]),
      hasGlint: false,
      hasTypeScript: false,
      isV1Addon: true,
      name: 'ember-container-query',
      version: '3.2.0',
    },
    testApp: {
      name: 'test-app',
    },
  },
  projectRoot: 'tmp/ember-container-query-javascript',
};

export { codemodOptions, context, options };
