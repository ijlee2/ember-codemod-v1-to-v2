import { updateTestAppTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/glint.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-test-app-tsconfig-json > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/glint/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-tsconfig-json/glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppTsconfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
