import { augmentOptions } from '../../../../../src/migration/ember-addon/steps/augment-options.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | augment-options > error handling (package name is not valid)', function () {
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
        'ERROR: In package.json, the package name `@ijlee2/` is not valid.'
      );

      return true;
    }
  );
});
