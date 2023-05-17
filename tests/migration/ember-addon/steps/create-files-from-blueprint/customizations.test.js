import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createFilesFromBlueprint } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/customizations.js';

test('migration | ember-addon | steps | create-files-from-blueprint > customizations', function () {
  const inputProject = {};

  const outputProject = convertFixtureToJson(
    'steps/create-files-from-blueprint/customizations/output',
  );

  loadFixture(inputProject, codemodOptions);

  createFilesFromBlueprint(context, options);

  assertFixture(outputProject, codemodOptions);
});
