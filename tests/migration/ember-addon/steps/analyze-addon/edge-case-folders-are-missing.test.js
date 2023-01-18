import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/analyze-addon.js';
import { assert, loadFixture, test } from '../../../../test-helpers.js';

test('migration | ember-addon | steps | analyze-addon > edge case (folders are missing)', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-javascript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {};

  const expectedValue = {
    appReexports: [],
    publicEntrypoints: [],
  };

  loadFixture(inputProject, options);

  // Run the step
  const augmentedOptions = {
    projectRoot: 'tmp/new-v1-addon-javascript',
  };

  assert.deepEqual(analyzeAddon(augmentedOptions), expectedValue);

  // Check idempotence
  assert.deepEqual(analyzeAddon(augmentedOptions), expectedValue);
});
