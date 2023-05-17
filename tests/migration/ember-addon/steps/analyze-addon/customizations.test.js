import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/index.js';
import { inputProject } from '../../../../fixtures/ember-container-query-customizations/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/customizations.js';

test('migration | ember-addon | steps | analyze-addon > customizations', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(analyzeAddon(options), context);
});
