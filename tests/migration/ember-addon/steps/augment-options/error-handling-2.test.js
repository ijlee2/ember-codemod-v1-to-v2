import { augmentOptions } from '../../../../../src/migration/ember-addon/steps/augment-options.js';
import { assert, loadFixture, test } from '../../../../test-helpers.js';

test('migration | ember-addon | steps | augment-options > error handling (empty object)', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-javascript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {
    'package.json': '{}',
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
        'ERROR: In package.json, the package name `undefined` is not valid.'
      );

      return true;
    }
  );
});
