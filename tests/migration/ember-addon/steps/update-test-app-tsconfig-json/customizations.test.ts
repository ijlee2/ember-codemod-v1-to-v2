import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateTestAppTsConfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/customizations.js';

test('migration | ember-addon | steps | update-test-app-tsconfig-json > customizations', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/customizations/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/customizations/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
