import { updateAddonTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import { convertToJson } from '../../../../helpers/fixture.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/javascript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-addon-tsconfig-json > typescript', function () {
  const inputProject = convertToJson(
    'steps/update-addon-tsconfig-json/javascript/input'
  );

  const outputProject = convertToJson(
    'steps/update-addon-tsconfig-json/javascript/output'
  );

  loadFixture(inputProject, options);

  updateAddonTsconfigJson(augmentedOptions);

  assertFixture(outputProject, options);
});
