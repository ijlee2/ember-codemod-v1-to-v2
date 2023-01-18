const options = {
  addonLocation: undefined,
  projectRoot: 'tmp/ember-container-query-javascript',
  testAppLocation: undefined,
  testAppName: undefined,
};

const augmentedOptions = {
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

export { augmentedOptions, options };
