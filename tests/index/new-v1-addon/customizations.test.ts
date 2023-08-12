import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../../fixtures/new-v1-addon-customizations/index.js';

test('index | new-v1-addon > customizations', function () {
  const codemodOptions = {
    addonLocation: 'packages/new-v1-addon',
    projectRoot: 'tmp/new-v1-addon-customizations',
    testAppLocation: 'demo-app',
    testAppName: 'demo-app-for-new-v1-addon',
  };

  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
