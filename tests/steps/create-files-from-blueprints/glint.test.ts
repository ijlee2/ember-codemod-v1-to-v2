import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createFilesFromBlueprints } from '../../../src/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/glint.js';

test('steps | create-files-from-blueprints > glint', function () {
  const inputProject = {};

  const outputProject = convertFixtureToJson(
    'steps/create-files-from-blueprints/glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  createFilesFromBlueprints(context, options);

  assertFixture(outputProject, codemodOptions);
});
