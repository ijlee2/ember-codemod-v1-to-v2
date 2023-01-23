import { createFilesFromBlueprint } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
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

  const context = {
    addon: {
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
    },
    projectRoot: {
      devDependencies: {
        concurrently: '^7.6.0',
        prettier: '^2.8.1',
      },
    },
  };

  createFilesFromBlueprint(context, options);

  assertFixture(outputProject, codemodOptions);
});
