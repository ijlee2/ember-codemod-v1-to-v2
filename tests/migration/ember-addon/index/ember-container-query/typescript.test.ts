import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { migrateEmberAddon } from '../../../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../../fixtures/ember-container-query-typescript/index.js';

test('migration | ember-addon | index | ember-container-query > typescript', function () {
  const codemodOptions = {
    addonLocation: undefined,
    projectRoot: 'tmp/ember-container-query-typescript',
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
