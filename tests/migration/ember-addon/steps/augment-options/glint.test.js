import { augmentOptions } from '../../../../../src/migration/ember-addon/steps/augment-options.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | augment-options > Glint', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-typescript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'new-v1-addon',
        version: '0.0.0',
        dependencies: {
          'ember-cli-babel': '^7.26.11',
          'ember-cli-htmlbars': '^6.1.1',
        },
        devDependencies: {
          '@glint/core': '^v1.0.0-beta.2',
          typescript: '^4.9.4',
        },
        'ember-addon': {
          configPath: 'tests/dummy/config',
        },
      },
      null,
      2
    ),
    'yarn.lock': '',
  };

  loadFixture(inputProject, options);

  assert.deepEqual(augmentOptions(options), {
    locations: {
      addon: 'new-v1-addon',
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
          ['@glint/core', '^v1.0.0-beta.2'],
          ['typescript', '^4.9.4'],
        ]),
        hasGlint: true,
        hasTypeScript: true,
        isV1Addon: true,
        name: 'new-v1-addon',
        version: '0.0.0',
      },
      testApp: {
        name: 'test-app',
      },
    },
    projectRoot: 'tmp/new-v1-addon-typescript',
  });
});
