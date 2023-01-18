import { migrateEmberAddon } from '../../../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../../fixtures/new-v1-addon-customizations/index.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | index > new-v1-addon-customizations', function () {
  const options = {
    addonLocation: 'packages/new-v1-addon',
    projectRoot: 'tmp/new-v1-addon-customizations',
    testAppLocation: 'demo-app',
    testAppName: 'demo-app-for-new-v1-addon',
  };

  loadFixture(inputProject, options);

  migrateEmberAddon(options);

  assertFixture(outputProject, options);

  // Check idempotence
  migrateEmberAddon(options);

  assertFixture(outputProject, options);
});
