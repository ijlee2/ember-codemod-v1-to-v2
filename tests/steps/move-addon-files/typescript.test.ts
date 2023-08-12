import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { moveAddonFiles } from '../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('migration | ember-addon | steps | move-addon-files > typescript', function () {
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

  const outputProject = {
    'ember-container-query': {
      src: {
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
    },
  };

  loadFixture(inputProject, codemodOptions);

  moveAddonFiles(options);

  assertFixture(outputProject, codemodOptions);
});
