import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | analyze-addon > typescript', function () {
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

  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(analyzeAddon(options), context);
});
