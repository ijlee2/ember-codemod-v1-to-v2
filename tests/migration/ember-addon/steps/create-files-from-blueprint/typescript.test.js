import { createFilesFromBlueprint } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-files-from-blueprint > typescript', function () {
  const inputProject = {};

  const outputProject = convertFixtureToJson(
    'steps/create-files-from-blueprint/typescript/output'
  );

  loadFixture(inputProject, codemodOptions);

  createFilesFromBlueprint(context, options);

  assertFixture(outputProject, codemodOptions);
});
