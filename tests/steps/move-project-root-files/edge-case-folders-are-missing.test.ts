import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { moveProjectRootFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('migration | ember-addon | steps | move-project-root-files > edge case (folders are missing)', function () {
  const inputProject = {};

  const outputProject = {};

  loadFixture(inputProject, codemodOptions);

  moveProjectRootFiles(options);

  assertFixture(outputProject, codemodOptions);
});
