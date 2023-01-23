import { augmentOptions } from '../../../../../src/migration/ember-addon/steps/index.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | augment-options > error handling (package.json is not a valid JSON)', function () {
  const codemodOptions = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-javascript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {
    'package.json': '{\n  "name": }',
    'yarn.lock': '',
  };

  loadFixture(inputProject, codemodOptions);

  assert.throws(
    () => {
      augmentOptions(codemodOptions);
    },
    (error) => {
      assert.strictEqual(
        error.message,
        'ERROR: package.json is missing or is not valid. (Unexpected token } in JSON at position 12)\n'
      );

      return true;
    }
  );
});
