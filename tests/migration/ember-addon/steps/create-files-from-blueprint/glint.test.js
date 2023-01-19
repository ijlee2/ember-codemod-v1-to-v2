import { createFilesFromBlueprint } from '../../../../../src/migration/ember-addon/steps/index.js';
import { convertToJson } from '../../../../helpers/fixture.js';
import { options } from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-files-from-blueprint > glint', function () {
  const inputProject = {};

  const outputProject = convertToJson(
    'steps/create-files-from-blueprint/glint/output'
  );

  loadFixture(inputProject, options);

  const augmentedOptions = {
    locations: {
      addon: 'ember-container-query',
      testApp: 'test-app',
    },
    packageManager: {
      isNpm: false,
      isPnpm: false,
      isYarn: true,
    },
    packages: {
      addon: {
        dependencies: new Map([
          ['ember-cli-babel', '^7.26.11'],
          ['ember-cli-htmlbars', '^6.1.1'],
          ['@glint/core', '^v1.0.0-beta.2'],
          ['typescript', '^4.9.4'],
        ]),
        hasGlint: true,
        hasTypeScript: true,
        isV1Addon: true,
        name: 'ember-container-query',
        version: '3.2.0',
      },
      testApp: {
        name: 'test-app',
      },
    },
    projectRoot: 'tmp/ember-container-query-typescript',
  };

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
