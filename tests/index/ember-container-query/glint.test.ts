import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../../fixtures/ember-container-query-glint/index.js';

test('migration | ember-addon | index | ember-container-query > glint', function () {
  const codemodOptions = {
    addonLocation: undefined,
    projectRoot: 'tmp/ember-container-query-glint',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
