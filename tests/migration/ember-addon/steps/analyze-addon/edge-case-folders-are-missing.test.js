import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  options,
  codemodOptions,
} from '../../../../helpers/shared-test-setups/typescript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | analyze-addon > edge case (folders are missing)', function () {
  const inputProject = {};

  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(analyzeAddon(options), {
    appReexports: [],
    publicEntrypoints: [],
  });
});
