import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateTestAppTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';

test('migration | ember-addon | steps | update-test-app-tsconfig-json > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/typescript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/typescript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppTsconfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
