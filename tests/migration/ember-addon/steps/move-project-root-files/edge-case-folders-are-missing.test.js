import { moveProjectRootFiles } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  options,
  codemodOptions,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | move-project-root-files > edge case (folders are missing)', function () {
  const inputProject = {};

  const outputProject = {};

  loadFixture(inputProject, codemodOptions);

  moveProjectRootFiles(options);

  assertFixture(outputProject, codemodOptions);
});
