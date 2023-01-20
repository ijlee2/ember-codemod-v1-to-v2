import { updateTestAppTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/javascript.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-test-app-tsconfig-json > javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/javascript/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/javascript/output'
  );

  loadFixture(inputProject, options);

  updateTestAppTsconfigJson(augmentedOptions);

  assertFixture(outputProject, options);
});
