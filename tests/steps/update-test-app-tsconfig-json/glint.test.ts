import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateTestAppTsConfigJson } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/glint.js';

test('steps | update-test-app-tsconfig-json > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/glint/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
