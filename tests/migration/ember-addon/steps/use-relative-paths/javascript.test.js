import { useRelativePaths } from '../../../../../src/migration/ember-addon/steps/use-relative-paths.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/javascript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

const fileMapping = new Map([
  [
    'addon/components/container-query.js',
    {
      input: [
        `import { action } from '@ember/object';`,
        `import Component from '@glimmer/component';`,
        `import { tracked } from '@glimmer/tracking';`,
      ].join('\n'),

      output: [
        `import { action } from '@ember/object';`,
        `import Component from '@glimmer/component';`,
        `import { tracked } from '@glimmer/tracking';`,
      ].join('\n'),
    },
  ],

  [
    'tests/dummy/app/components/widgets/widget-3/tour-schedule/responsive-image.js',
    {
      input: [
        `import { action } from '@ember/object';`,
        `import Component from '@glimmer/component';`,
        `import { tracked } from '@glimmer/tracking';`,
        `import { findBestFittingImage } from 'dummy/utils/components/widgets/widget-3';`,
      ].join('\n'),

      output: [
        `import { action } from '@ember/object';`,
        `import Component from '@glimmer/component';`,
        `import { tracked } from '@glimmer/tracking';`,
        `import { findBestFittingImage } from '../../../../utils/components/widgets/widget-3';`,
      ].join('\n'),
    },
  ],

  [
    'tests/dummy/app/app.js',
    {
      input: [
        `import Application from '@ember/application';`,
        `import config from 'dummy/config/environment';`,
        `import loadInitializers from 'ember-load-initializers';`,
        `import Resolver from 'ember-resolver';`,
      ].join('\n'),

      output: [
        `import Application from '@ember/application';`,
        `import config from './config/environment';`,
        `import loadInitializers from 'ember-load-initializers';`,
        `import Resolver from 'ember-resolver';`,
      ].join('\n'),
    },
  ],
]);

test('migration | ember-addon | steps | use-relative-paths > typescript', function () {
  const inputProject = {
    addon: {
      components: {
        'container-query.js': fileMapping.get(
          'addon/components/container-query.js'
        ).input,
      },
    },
    tests: {
      dummy: {
        app: {
          components: {
            widgets: {
              'widget-3': {
                'tour-schedule': {
                  'responsive-image.js': fileMapping.get(
                    'tests/dummy/app/components/widgets/widget-3/tour-schedule/responsive-image.js'
                  ).input,
                },
              },
            },
          },
          'app.js': fileMapping.get('tests/dummy/app/app.js').input,
        },
      },
    },
  };

  const outputProject = {
    addon: {
      components: {
        'container-query.js': fileMapping.get(
          'addon/components/container-query.js'
        ).output,
      },
    },
    tests: {
      dummy: {
        app: {
          components: {
            widgets: {
              'widget-3': {
                'tour-schedule': {
                  'responsive-image.js': fileMapping.get(
                    'tests/dummy/app/components/widgets/widget-3/tour-schedule/responsive-image.js'
                  ).output,
                },
              },
            },
          },
          'app.js': fileMapping.get('tests/dummy/app/app.js').output,
        },
      },
    },
  };

  loadFixture(inputProject, options);

  useRelativePaths(augmentedOptions);

  assertFixture(outputProject, options);
});
