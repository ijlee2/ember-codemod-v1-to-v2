import { useRelativePaths } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  codemodOptions,
} from '../../../../helpers/shared-test-setups/customizations.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | use-relative-paths > customizations', function () {
  const inputProject = convertFixtureToJson(
    'steps/use-relative-paths/customizations/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/use-relative-paths/customizations/output'
  );

  loadFixture(inputProject, codemodOptions);

  useRelativePaths(augmentedOptions);

  assertFixture(outputProject, codemodOptions);
});
