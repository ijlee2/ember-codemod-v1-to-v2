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
} from '../../helpers/shared-test-setups/scoped.js';

test('steps | update-test-app-tsconfig-json > scoped', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/scoped/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/scoped/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
