import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { moveTestAppFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/javascript.js';

test('migration | ember-addon | steps | move-test-app-files > javascript', function () {
  const inputProject = {
    tests: {
      acceptance: {
        album: {
          'accessibility-test.js': '',
          'visual-regression-test.js': '',
        },
      },
      dummy: {
        app: {
          components: {
            '.gitkeep': '',
          },
          routes: {
            '.gitkeep': '',
          },
          templates: {
            '.gitkeep': '',
          },
          'app.js': '',
          'index.html': '',
          'router.js': '',
        },
        config: {
          'ember-cli-update.json': '',
          'ember-try.js': '',
          'environment.js': '',
          'optional-features.json': '',
          'targets.js': '',
        },
        public: {
          assets: {
            'favicon.png': '',
          },
          'robots.txt': '',
        },
      },
      helpers: {
        'index.js': '',
      },
      integration: {
        components: {
          'container-query': {
            'dataAttributePrefix-test.js': '',
            'debounce-test.js': '',
            'features-test.js': '',
            'splattributes-test.js': '',
            'tagName-test.js': '',
          },
        },
      },
      unit: {
        utils: {
          components: {
            widgets: {
              'widget-2-test.js': '',
              'widget-3-test.js': '',
            },
          },
        },
        '.gitkeep': '',
      },
      'index.html': '',
      'test-helper.js': '',
    },
  };

  const outputProject = {
    'test-app': {
      app: {
        components: {
          '.gitkeep': '',
        },
        routes: {
          '.gitkeep': '',
        },
        templates: {
          '.gitkeep': '',
        },
        'app.js': '',
        'index.html': '',
        'router.js': '',
      },
      config: {
        'ember-cli-update.json': '',
        'ember-try.js': '',
        'environment.js': '',
        'optional-features.json': '',
        'targets.js': '',
      },
      public: {
        assets: {
          'favicon.png': '',
        },
        'robots.txt': '',
      },
      tests: {
        acceptance: {
          album: {
            'accessibility-test.js': '',
            'visual-regression-test.js': '',
          },
        },
        helpers: {
          'index.js': '',
        },
        integration: {
          components: {
            'container-query': {
              'dataAttributePrefix-test.js': '',
              'debounce-test.js': '',
              'features-test.js': '',
              'splattributes-test.js': '',
              'tagName-test.js': '',
            },
          },
        },
        unit: {
          utils: {
            components: {
              widgets: {
                'widget-2-test.js': '',
                'widget-3-test.js': '',
              },
            },
          },
          '.gitkeep': '',
        },
        'index.html': '',
        'test-helper.js': '',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  moveTestAppFiles(options);

  assertFixture(outputProject, codemodOptions);
});
