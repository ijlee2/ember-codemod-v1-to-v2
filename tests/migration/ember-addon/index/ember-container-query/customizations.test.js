import { migrateEmberAddon } from '../../../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../../fixtures/ember-container-query-customizations/index.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | index | ember-container-query > customizations', function () {
  const options = {
    addonLocation: 'packages/ember-container-query',
    projectRoot: 'tmp/ember-container-query-customizations',
    testAppLocation: 'demo-app',
    testAppName: 'demo-app-for-ember-container-query',
  };

  loadFixture(inputProject, options);

  migrateEmberAddon(options);

  assertFixture(outputProject, options);

  // Check idempotence
  migrateEmberAddon(options);

  assertFixture(outputProject, options);
});
