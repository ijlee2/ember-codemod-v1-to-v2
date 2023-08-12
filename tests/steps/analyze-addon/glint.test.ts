import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeAddon } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/ember-container-query-glint/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/glint.js';

test('migration | ember-addon | steps | analyze-addon > glint', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeAddon(options), context);
});
