import { useRelativePaths } from '../../../../../src/migration/ember-addon/steps/use-relative-paths.js';
import { assertFixture, loadFixture, test } from '../../../../test-helpers.js';

test('migration | ember-addon | steps | use-relative-paths > edge case (folders are missing)', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-javascript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {};

  const outputProject = {};

  loadFixture(inputProject, options);

  // Run the step
  const augmentedOptions = {
    projectRoot: 'tmp/new-v1-addon-javascript',
  };

  useRelativePaths(augmentedOptions);

  assertFixture(outputProject, options);

  // Check idempotence
  useRelativePaths(augmentedOptions);

  assertFixture(outputProject, options);
});
