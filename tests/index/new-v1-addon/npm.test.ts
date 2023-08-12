import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { migrateEmberAddon } from '../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../fixtures/new-v1-addon-npm/index.js';

test('migration | ember-addon | index | new-v1-addon > npm', function () {
  const codemodOptions = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-npm',
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
