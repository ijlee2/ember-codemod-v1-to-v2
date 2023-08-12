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
} from '../../helpers/shared-test-setups/javascript.js';

test('steps | update-addon-tsconfig-json > javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
