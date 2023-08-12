import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createFilesFromBlueprints } from '../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/glint.js';

test('migration | ember-addon | steps | create-files-from-blueprints > glint', function () {
  const inputProject = {};

  const outputProject = convertFixtureToJson(
    'steps/create-files-from-blueprints/glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  createFilesFromBlueprints(context, options);

  assertFixture(outputProject, codemodOptions);
});
