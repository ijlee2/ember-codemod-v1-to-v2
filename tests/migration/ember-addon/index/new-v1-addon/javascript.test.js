import { migrateEmberAddon } from '../../../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../../fixtures/new-v1-addon-javascript/index.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | index | new-v1-addon > javascript', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-javascript',
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
