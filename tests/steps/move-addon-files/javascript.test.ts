import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { moveAddonFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/javascript.js';

test('migration | ember-addon | steps | move-addon-files > javascript', function () {
  const inputProject = {
    addon: {
      components: {
        'container-query.hbs': '',
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
      styles: {
        'container-query.css': '',
      },
      '.gitkeep': '',
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
        styles: {
          'container-query.css': '',
        },
        '.gitkeep': '',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  moveAddonFiles(options);

  assertFixture(outputProject, codemodOptions);
});
