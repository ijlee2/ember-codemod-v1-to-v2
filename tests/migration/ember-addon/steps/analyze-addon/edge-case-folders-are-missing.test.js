import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/customizations.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | analyze-addon > edge case (folders are missing)', function () {
  const inputProject = {};

  loadFixture(inputProject, options);

  assert.deepEqual(analyzeAddon(augmentedOptions), {
    appReexports: [],
    publicEntrypoints: [],
  });
});
