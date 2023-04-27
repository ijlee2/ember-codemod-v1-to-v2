import { createOptions } from '../../../../../src/migration/ember-addon/steps/index.js';
import { codemodOptions } from '../../../../helpers/shared-test-setups/javascript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-options > error handling (package.json is not a valid JSON)', function () {
  const inputProject = {
    'package.json': '{\n  "name": }',
    'yarn.lock': '',
  };

  loadFixture(inputProject, codemodOptions);

  assert.throws(
    () => {
      createOptions(codemodOptions);
    },
    (error) => {
      assert.strictEqual(
        error.message,
        'ERROR: package.json is missing or is not valid. (Unexpected token } in JSON at position 12)\n',
      );

      return true;
    },
  );
});
