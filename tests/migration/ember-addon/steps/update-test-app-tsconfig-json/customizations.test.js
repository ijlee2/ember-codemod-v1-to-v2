import { updateTestAppTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  codemodOptions,
} from '../../../../helpers/shared-test-setups/customizations.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-test-app-tsconfig-json > customizations', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/customizations/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/customizations/output'
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppTsconfigJson(augmentedOptions);

  assertFixture(outputProject, codemodOptions);
});
