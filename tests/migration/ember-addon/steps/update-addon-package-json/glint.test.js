import { updateAddonPackageJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/glint.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-addon-package-json > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-package-json/glint/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-package-json/glint/output'
  );

  loadFixture(inputProject, options);

  updateAddonPackageJson(augmentedOptions);

  assertFixture(outputProject, options);
});
