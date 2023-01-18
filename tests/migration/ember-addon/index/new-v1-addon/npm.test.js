import { migrateEmberAddon } from '../../../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../../fixtures/new-v1-addon-npm/index.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | index > new-v1-addon-npm', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-npm',
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
