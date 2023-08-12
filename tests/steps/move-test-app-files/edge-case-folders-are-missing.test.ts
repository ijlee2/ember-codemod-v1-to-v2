import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { moveTestAppFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('migration | ember-addon | steps | move-test-app-files > edge case (folders are missing)', function () {
  const inputProject = {};

  const outputProject = {};

  loadFixture(inputProject, codemodOptions);

  moveTestAppFiles(options);

  assertFixture(outputProject, codemodOptions);
});
