import { augmentOptions } from '../../../../../src/migration/ember-addon/steps/augment-options.js';
import { assert, loadFixture, test } from '../../../../test-helpers.js';

test('migration | ember-addon | steps | augment-options > error handling (incorrect scoped package name)', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-javascript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: '@ijlee2/',
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
    'yarn.lock': 'some code for yarn.lock',
  };

  loadFixture(inputProject, options);

  assert.throws(
    () => {
      augmentOptions(options);
    },
    (error) => {
      assert.strictEqual(
        error.message,
        'ERROR: In package.json, the package name `@ijlee2/` is not valid.'
      );

      return true;
    }
  );
});
