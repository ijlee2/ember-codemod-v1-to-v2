import { updateTestAppPackageJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  codemodOptions,
} from '../../../../helpers/shared-test-setups/javascript.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-test-app-package-json > javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/javascript/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/javascript/output'
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppPackageJson(augmentedOptions);

  assertFixture(outputProject, codemodOptions);
});
