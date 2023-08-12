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
} from '../../helpers/shared-test-setups/javascript.js';

test('migration | ember-addon | steps | update-test-app-tsconfig-json > javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppTsConfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
