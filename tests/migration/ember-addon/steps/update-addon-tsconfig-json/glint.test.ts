import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateAddonTsConfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/glint.js';

test('migration | ember-addon | steps | update-addon-tsconfig-json > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/glint/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
