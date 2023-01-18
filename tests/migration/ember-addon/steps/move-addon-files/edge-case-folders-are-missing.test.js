import { moveAddonFiles } from '../../../../../src/migration/ember-addon/steps/move-addon-files.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | move-addon-files > edge case (folders are missing)', function () {
  const inputProject = {};

  const outputProject = {};

  loadFixture(inputProject, options);

  moveAddonFiles(augmentedOptions);

  assertFixture(outputProject, options);
});
