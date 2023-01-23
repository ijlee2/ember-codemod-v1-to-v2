import { createFilesFromBlueprint } from '../../../../../src/migration/ember-addon/steps/index.js';
import { codemodOptions } from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-files-from-blueprint > pnpm', function () {
  const inputProject = {};

  const outputProject = convertFixtureToJson(
    'steps/create-files-from-blueprint/pnpm/output'
  );

  loadFixture(inputProject, codemodOptions);

  const options = {
    locations: {
      addon: 'ember-container-query',
      testApp: 'test-app',
    },
    packageManager: {
      isNpm: false,
      isPnpm: true,
      isYarn: false,
    },
    packages: {
      addon: {
        dependencies: new Map([
          ['ember-cli-babel', '^7.26.11'],
          ['ember-cli-htmlbars', '^6.1.1'],
          ['typescript', '^4.9.4'],
        ]),
        hasGlint: false,
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
