import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/analyze-addon.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | analyze-addon > base case', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/ember-container-query-typescript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {
    addon: {
      components: {
        'container-query.hbs': '',
        'container-query.ts': '',
      },
      helpers: {
        'aspect-ratio.ts': '',
        'height.ts': '',
        'width.ts': '',
      },
      modifiers: {
        'container-query.ts': '',
      },
      styles: {
        'container-query.css': '',
      },
      '.gitkeep': '',
      'index.ts': '',
      'template-registry.ts': '',
    },
    app: {
      components: {
        'container-query.js': '',
      },
      helpers: {
        'aspect-ratio.js': '',
        'height.js': '',
        'width.js': '',
      },
      modifiers: {
        'container-query.js': '',
      },
      '.gitkeep': '',
    },
  };

  const expectedValue = {
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

  loadFixture(inputProject, options);

  // Run the step
  const augmentedOptions = {
    projectRoot: 'tmp/ember-container-query-typescript',
  };

  assert.deepEqual(analyzeAddon(augmentedOptions), expectedValue);

  // Check idempotence
  assert.deepEqual(analyzeAddon(augmentedOptions), expectedValue);
});
