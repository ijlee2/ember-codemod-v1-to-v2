const codemodOptions = {
  addonLocation: undefined,
  projectRoot: 'tmp/ember-container-query-typescript',
  testAppLocation: undefined,
  testAppName: undefined,
};

const options = {
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
        ['ember-cli-typescript', '^5.2.1'],
        ['ember-element-helper', '^0.6.1'],
        ['ember-modifier', '^3.2.7'],
        ['ember-resize-observer-service', '^1.1.0'],
        ['ember-test-selectors', '^6.0.0'],
        ['@ember/optional-features', '^2.0.0'],
        ['@ember/test-helpers', '^2.9.3'],
        ['@embroider/test-setup', '^2.0.2'],
        ['@gavant/glint-template-types', '^0.3.0'],
        ['@glimmer/component', '^1.1.2'],
        ['@glimmer/tracking', '^1.1.2'],
        ['@glint/core', '^v1.0.0-beta.2'],
        ['@glint/environment-ember-loose', '^v1.0.0-beta.2'],
        ['@glint/template', '^v1.0.0-beta.2'],
        ['@percy/cli', '^1.16.0'],
        ['@percy/ember', '^4.0.0'],
        ['@tsconfig/ember', '^2.0.0'],
        ['@types/ember__application', '^4.0.5'],
        ['@types/ember__array', '^4.0.3'],
        ['@types/ember__component', '^4.0.12'],
        ['@types/ember__controller', '^4.0.4'],
        ['@types/ember__debug', '^4.0.3'],
        ['@types/ember__destroyable', '^4.0.1'],
        ['@types/ember__engine', '^4.0.4'],
        ['@types/ember__error', '^4.0.2'],
        ['@types/ember__object', '^4.0.5'],
        ['@types/ember__polyfills', '^4.0.1'],
        ['@types/ember__routing', '^4.0.12'],
        ['@types/ember__runloop', '^4.0.2'],
        ['@types/ember__service', '^4.0.2'],
        ['@types/ember__string', '^3.0.10'],
        ['@types/ember__template', '^4.0.1'],
        ['@types/ember__test', '^4.0.1'],
        ['@types/ember__utils', '^4.0.2'],
        ['@types/htmlbars-inline-precompile', '^3.0.0'],
        ['@types/qunit', '^2.19.3'],
        ['@types/rsvp', '^4.0.4'],
        ['@typescript-eslint/eslint-plugin', '^5.48.0'],
        ['@typescript-eslint/parser', '^5.48.0'],
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
        ['eslint-plugin-typescript-sort-keys', '^2.1.0'],
        ['lerna-changelog', '^2.2.0'],
        ['loader.js', '^4.7.0'],
        ['prettier', '^2.8.1'],
        ['qunit', '^2.19.3'],
        ['qunit-dom', '^2.0.0'],
        ['stylelint', '^14.16.1'],
        ['stylelint-config-standard', '^29.0.0'],
        ['stylelint-no-unsupported-browser-features', '^6.0.1'],
        ['stylelint-order', '^6.0.0'],
        ['typescript', '^4.9.4'],
        ['webpack', '^5.75.0'],
      ]),
      hasGlint: true,
      hasTypeScript: true,
      isV1Addon: true,
      name: 'ember-container-query',
      version: '3.2.0',
    },
    testApp: {
      name: 'test-app',
    },
  },
  projectRoot: 'tmp/ember-container-query-typescript',
};

export { options, codemodOptions };
