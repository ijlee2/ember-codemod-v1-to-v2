const options = {
  addonLocation: undefined,
  projectRoot: 'tmp/ember-container-query-typescript',
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
        ['typescript', '^4.9.4'],
      ]),
      hasGlint: false,
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

export { augmentedOptions, options };
