import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateAddonTsConfigJson } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/customizations.js';

test('migration | ember-addon | steps | update-addon-tsconfig-json > customizations', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/customizations/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/customizations/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
