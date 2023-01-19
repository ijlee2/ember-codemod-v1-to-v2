import { migrateEmberAddon } from '../../../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../../fixtures/ember-container-query-typescript/index.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | index | ember-container-query > typescript', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/ember-container-query-typescript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  loadFixture(inputProject, options);

  migrateEmberAddon(options);

  assertFixture(outputProject, options);

  // Check idempotence
  migrateEmberAddon(options);

  assertFixture(outputProject, options);
});
