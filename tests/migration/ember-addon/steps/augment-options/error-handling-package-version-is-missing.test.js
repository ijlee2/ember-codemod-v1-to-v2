import { augmentOptions } from '../../../../../src/migration/ember-addon/steps/augment-options.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | augment-options > error handling (package version is missing)', function () {
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
      },
      null,
      2
    ),
    'yarn.lock': '',
  };

  loadFixture(inputProject, options);

  assert.throws(
    () => {
      augmentOptions(options);
    },
    (error) => {
      assert.strictEqual(
        error.message,
        'ERROR: package.json is missing or is not valid. (Package version is missing.)\n'
      );

      return true;
    }
  );
});
