import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/index.js';
import { inputProject } from '../../../../fixtures/ember-container-query-typescript/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | analyze-addon > typescript', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(analyzeAddon(options), context);
});
