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
} from '../../helpers/shared-test-setups/scoped.js';

test('steps | update-addon-tsconfig-json > scoped', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/scoped/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/scoped/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
