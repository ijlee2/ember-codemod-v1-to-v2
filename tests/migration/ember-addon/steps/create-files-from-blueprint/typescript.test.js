import { createFilesFromBlueprint } from '../../../../../src/migration/ember-addon/steps/create-files-from-blueprint.js';
import { convertToJson } from '../../../../helpers/fixture.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-files-from-blueprint > typescript', function () {
  const inputProject = {};

  const outputProject = convertToJson(
    'steps/create-files-from-blueprint/typescript/output'
  );

  loadFixture(inputProject, options);

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
      'index.js',
      'modifiers/container-query.js',
      'template-registry.js',
    ],
  };

  createFilesFromBlueprint(context, augmentedOptions);

  assertFixture(outputProject, options);
});
