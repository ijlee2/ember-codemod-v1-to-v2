import { createOptions } from '../../../../../src/migration/ember-addon/steps/index.js';
import { codemodOptions } from '../../../../helpers/shared-test-setups/javascript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-options > error handling (package version is missing)', function () {
  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'ember-container-query',
      },
      null,
      2
    ),
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
        'ERROR: package.json is missing or is not valid. (Package version is missing.)\n'
      );

      return true;
    }
  );
});
