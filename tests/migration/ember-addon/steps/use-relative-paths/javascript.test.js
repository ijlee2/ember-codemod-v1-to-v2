import { useRelativePaths } from '../../../../../src/migration/ember-addon/steps/use-relative-paths.js';
import { convertToJson } from '../../../../helpers/fixture.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/javascript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | use-relative-paths > typescript', function () {
  const inputProject = convertToJson(
    'steps/use-relative-paths/javascript/input'
  );

  const outputProject = convertToJson(
    'steps/use-relative-paths/javascript/output'
  );

  loadFixture(inputProject, options);

  useRelativePaths(augmentedOptions);

  assertFixture(outputProject, options);
});