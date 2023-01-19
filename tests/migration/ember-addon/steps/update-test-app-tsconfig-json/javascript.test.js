import { updateTestAppTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
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

test('migration | ember-addon | steps | update-test-app-tsconfig-json > typescript', function () {
  const inputProject = convertToJson(
    'steps/update-test-app-tsconfig-json/javascript/input'
  );

  const outputProject = convertToJson(
    'steps/update-test-app-tsconfig-json/javascript/output'
  );

  loadFixture(inputProject, options);

  updateTestAppTsconfigJson(augmentedOptions);

  assertFixture(outputProject, options);
});
