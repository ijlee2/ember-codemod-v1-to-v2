import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { moveTestAppFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('migration | ember-addon | steps | move-test-app-files > typescript', function () {
  const inputProject = {
    tests: {
      acceptance: {
        album: {
          'accessibility-test.ts': '',
          'visual-regression-test.ts': '',
        },
      },
      dummy: {
        app: {
          components: {
            '.gitkeep': '',
          },
          config: {
            'environment.d.ts': '',
          },
          routes: {
            '.gitkeep': '',
          },
          templates: {
            '.gitkeep': '',
          },
          'app.ts': '',
          'index.html': '',
          'router.ts': '',
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
        'index.ts': '',
      },
      integration: {
        components: {
          'container-query': {
            'dataAttributePrefix-test.ts': '',
            'debounce-test.ts': '',
            'features-test.ts': '',
            'splattributes-test.ts': '',
            'tagName-test.ts': '',
          },
        },
      },
      unit: {
        utils: {
          components: {
            widgets: {
              'widget-2-test.ts': '',
              'widget-3-test.ts': '',
            },
          },
        },
        '.gitkeep': '',
      },
      'index.html': '',
      'test-helper.ts': '',
    },
    types: {
      dummy: {
        'index.d.ts': '',
      },
      'global.d.ts': '',
    },
  };

  const outputProject = {
    'test-app': {
      app: {
        components: {
          '.gitkeep': '',
        },
        config: {
          'environment.d.ts': '',
        },
        routes: {
          '.gitkeep': '',
        },
        templates: {
          '.gitkeep': '',
        },
        'app.ts': '',
        'index.html': '',
        'router.ts': '',
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
            'accessibility-test.ts': '',
            'visual-regression-test.ts': '',
          },
        },
        helpers: {
          'index.ts': '',
        },
        integration: {
          components: {
            'container-query': {
              'dataAttributePrefix-test.ts': '',
              'debounce-test.ts': '',
              'features-test.ts': '',
              'splattributes-test.ts': '',
              'tagName-test.ts': '',
            },
          },
        },
        unit: {
          utils: {
            components: {
              widgets: {
                'widget-2-test.ts': '',
                'widget-3-test.ts': '',
              },
            },
          },
          '.gitkeep': '',
        },
        'index.html': '',
        'test-helper.ts': '',
      },
      types: {
        'test-app': {
          'index.d.ts': '',
        },
        'global.d.ts': '',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  moveTestAppFiles(options);

  assertFixture(outputProject, codemodOptions);
});
