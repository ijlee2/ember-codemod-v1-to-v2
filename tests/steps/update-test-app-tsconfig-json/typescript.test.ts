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
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | update-test-app-tsconfig-json > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/typescript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/typescript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
