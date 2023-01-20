import { updateTestAppTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-test-app-tsconfig-json > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/typescript/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/typescript/output'
  );

  loadFixture(inputProject, options);

  updateTestAppTsconfigJson(augmentedOptions);

  assertFixture(outputProject, options);
});
