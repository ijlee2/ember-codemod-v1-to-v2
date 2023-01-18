import { augmentOptions } from '../../../../../src/migration/ember-addon/steps/augment-options.js';
import { assert, loadFixture, test } from '../../../../test-helpers.js';

test('migration | ember-addon | steps | augment-options > pnpm', function () {
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
        dependencies: {
          'ember-cli-babel': '^7.26.11',
          'ember-cli-htmlbars': '^6.1.1',
        },
        devDependencies: {},
        'ember-addon': {
          configPath: 'tests/dummy/config',
        },
      },
      null,
      2
    ),
    'pnpm-lock.yaml': '',
  };

  loadFixture(inputProject, options);

  assert.deepEqual(augmentOptions(options), {
    locations: {
      addon: 'new-v1-addon',
      testApp: 'test-app',
    },
    packageManager: {
      isNpm: false,
      isPnpm: true,
      isYarn: false,
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
