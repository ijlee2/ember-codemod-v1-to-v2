import { updateAddonTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  codemodOptions,
} from '../../../../helpers/shared-test-setups/glint.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-addon-tsconfig-json > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/glint/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/glint/output'
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonTsconfigJson(augmentedOptions);

  assertFixture(outputProject, codemodOptions);
});
