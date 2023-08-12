import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../../fixtures/new-v1-addon-pnpm/index.js';

test('migration | ember-addon | index | new-v1-addon > pnpm', function () {
  const codemodOptions = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-pnpm',
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
