import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeAddon } from '../../../src/migration/ember-addon/steps/index.js';
import { inputProject } from '../../fixtures/ember-container-query-javascript/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/javascript.js';

test('migration | ember-addon | steps | analyze-addon > javascript', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeAddon(options), context);
});
