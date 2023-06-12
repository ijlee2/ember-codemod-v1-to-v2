import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { migrateEmberAddon } from '../../../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../../fixtures/ember-container-query-customizations/index.js';

test('migration | ember-addon | index | ember-container-query > customizations', function () {
  const codemodOptions = {
    addonLocation: 'packages/ember-container-query',
    projectRoot: 'tmp/ember-container-query-customizations',
    testAppLocation: 'demo-app',
    testAppName: 'demo-app-for-ember-container-query',
  };

  loadFixture(inputProject, codemodOptions);

  migrateEmberAddon(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  migrateEmberAddon(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
