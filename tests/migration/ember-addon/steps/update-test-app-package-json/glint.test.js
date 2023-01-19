import { updateTestAppPackageJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import { convertToJson } from '../../../../helpers/fixture.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/glint.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-test-app-package-json > glint', function () {
  const inputProject = convertToJson(
    'steps/update-test-app-package-json/glint/input'
  );

  const outputProject = convertToJson(
    'steps/update-test-app-package-json/glint/output'
  );

  loadFixture(inputProject, options);

  updateTestAppPackageJson(augmentedOptions);

  assertFixture(outputProject, options);
});
