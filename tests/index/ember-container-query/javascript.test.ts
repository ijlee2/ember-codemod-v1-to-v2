import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { migrateEmberAddon } from '../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../fixtures/ember-container-query-javascript/index.js';

test('migration | ember-addon | index | ember-container-query > javascript', function () {
  const codemodOptions = {
    addonLocation: undefined,
    projectRoot: 'tmp/ember-container-query-javascript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  loadFixture(inputProject, codemodOptions);

  migrateEmberAddon(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  migrateEmberAddon(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
