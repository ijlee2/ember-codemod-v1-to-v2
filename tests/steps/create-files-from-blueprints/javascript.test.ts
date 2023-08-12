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
} from '../../helpers/shared-test-setups/javascript.js';

test('migration | ember-addon | steps | create-files-from-blueprints > javascript', function () {
  const inputProject = {};

  const outputProject = convertFixtureToJson(
    'steps/create-files-from-blueprints/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  createFilesFromBlueprints(context, options);

  assertFixture(outputProject, codemodOptions);
});
