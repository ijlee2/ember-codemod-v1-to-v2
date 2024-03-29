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
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | update-addon-tsconfig-json > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/typescript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/typescript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
