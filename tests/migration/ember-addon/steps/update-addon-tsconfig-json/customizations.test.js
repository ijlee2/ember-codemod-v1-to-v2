import { updateAddonTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/customizations.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-addon-tsconfig-json > customizations', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/customizations/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/customizations/output'
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonTsconfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
