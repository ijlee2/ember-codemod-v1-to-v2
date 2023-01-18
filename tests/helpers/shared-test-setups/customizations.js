const options = {
  addonLocation: 'packages/ember-container-query',
  projectRoot: 'tmp/ember-container-query-customizations',
  testAppLocation: 'demo-app',
  testAppName: 'demo-app-for-ember-container-query',
};

const augmentedOptions = {
  locations: {
    addon: 'packages/ember-container-query',
    testApp: 'demo-app',
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
      name: 'demo-app-for-ember-container-query',
    },
  },
  projectRoot: 'tmp/ember-container-query-customizations',
};

export { augmentedOptions, options };
