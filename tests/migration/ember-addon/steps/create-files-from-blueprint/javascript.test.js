import { createFilesFromBlueprint } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/javascript.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-files-from-blueprint > javascript', function () {
  const inputProject = {};

  const outputProject = convertFixtureToJson(
    'steps/create-files-from-blueprint/javascript/output'
  );

  loadFixture(inputProject, codemodOptions);

  const context = {
    appReexports: [
      'components/container-query.js',
      'helpers/aspect-ratio.js',
      'helpers/height.js',
      'helpers/width.js',
      'modifiers/container-query.js',
    ],
    publicEntrypoints: [
      'components/container-query.js',
      'helpers/aspect-ratio.js',
      'helpers/height.js',
      'helpers/width.js',
      'modifiers/container-query.js',
    ],
  };

  createFilesFromBlueprint(context, options);

  assertFixture(outputProject, codemodOptions);
});
