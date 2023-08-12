import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeAddon } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/ember-container-query-customizations/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/customizations.js';

test('steps | analyze-addon > customizations', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeAddon(options), context);
});
