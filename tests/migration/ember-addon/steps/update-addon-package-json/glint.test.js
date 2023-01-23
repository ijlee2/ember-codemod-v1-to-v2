import { updateAddonPackageJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
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

  loadFixture(inputProject, codemodOptions);

  updateAddonPackageJson(options);

  assertFixture(outputProject, codemodOptions);
});
