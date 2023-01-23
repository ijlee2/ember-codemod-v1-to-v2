import { useRelativePaths } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  codemodOptions,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | use-relative-paths > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/use-relative-paths/typescript/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/use-relative-paths/typescript/output'
  );

  loadFixture(inputProject, codemodOptions);

  useRelativePaths(augmentedOptions);

  assertFixture(outputProject, codemodOptions);
});
