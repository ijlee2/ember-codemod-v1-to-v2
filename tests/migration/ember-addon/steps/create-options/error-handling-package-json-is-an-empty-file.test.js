import { createOptions } from '../../../../../src/migration/ember-addon/steps/index.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-options > error handling (package.json is an empty file)', function () {
  const augmentedOptions = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-javascript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {
    'package.json': '',
    'yarn.lock': '',
  };

  loadFixture(inputProject, augmentedOptions);

  assert.throws(
    () => {
      createOptions(augmentedOptions);
    },
    (error) => {
      assert.strictEqual(
        error.message,
        'ERROR: package.json is missing or is not valid. (Unexpected end of JSON input)\n'
      );

      return true;
    }
  );
});
