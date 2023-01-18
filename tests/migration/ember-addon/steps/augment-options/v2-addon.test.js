import { augmentOptions } from '../../../../../src/migration/ember-addon/steps/augment-options.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | augment-options > v2 addon', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-javascript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'new-v1-addon',
        version: '0.0.0',
        private: true,
        workspaces: ['new-v1-addon', 'test-app'],
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
        dependencies: new Map(),
        hasGlint: false,
        hasTypeScript: false,
        isV1Addon: false,
        name: 'new-v1-addon',
        version: '0.0.0',
      },
      testApp: {
        name: 'test-app',
      },
    },
    projectRoot: 'tmp/new-v1-addon-javascript',
  });
});
