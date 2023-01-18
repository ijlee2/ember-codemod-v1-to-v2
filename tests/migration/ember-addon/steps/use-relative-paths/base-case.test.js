import { useRelativePaths } from '../../../../../src/migration/ember-addon/steps/use-relative-paths.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

const fileMapping = new Map([
  [
    'addon/components/container-query.ts',
    {
      input: [
        `import { action } from '@ember/object';`,
        `import Component from '@glimmer/component';`,
        `import { tracked } from '@glimmer/tracking';`,
        ``,
        `import type {`,
        `  Dimensions,`,
        `  Features,`,
        `  IndexSignatureParameter,`,
        `  QueryResults,`,
        `} from 'ember-container-query/modifiers/container-query';`,
      ].join('\n'),

      output: [
        `import { action } from '@ember/object';`,
        `import Component from '@glimmer/component';`,
        `import { tracked } from '@glimmer/tracking';`,
        ``,
        `import type {`,
        `  Dimensions,`,
        `  Features,`,
        `  IndexSignatureParameter,`,
        `  QueryResults,`,
        `} from '../modifiers/container-query';`,
      ].join('\n'),
    },
  ],

  [
    'tests/dummy/app/components/widgets/widget-3/tour-schedule/responsive-image.ts',
    {
      input: [
        `import { action } from '@ember/object';`,
        `import Component from '@glimmer/component';`,
        `import { tracked } from '@glimmer/tracking';`,
        `import type { Image } from 'dummy/data/concert';`,
        `import { findBestFittingImage } from 'dummy/utils/components/widgets/widget-3';`,
        `import type { Dimensions } from 'ember-container-query/modifiers/container-query';`,
      ].join('\n'),

      output: [
        `import { action } from '@ember/object';`,
        `import Component from '@glimmer/component';`,
        `import { tracked } from '@glimmer/tracking';`,
        `import type { Image } from '../../../../data/concert';`,
        `import { findBestFittingImage } from '../../../../utils/components/widgets/widget-3';`,
        `import type { Dimensions } from 'ember-container-query/modifiers/container-query';`,
      ].join('\n'),
    },
  ],

  [
    'tests/dummy/app/app.ts',
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

test('migration | ember-addon | steps | use-relative-paths > base case', function () {
  const options = {
    addonLocation: undefined,
    projectRoot: 'tmp/ember-container-query-typescript',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {
    addon: {
      components: {
        'container-query.ts': fileMapping.get(
          'addon/components/container-query.ts'
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
                  'responsive-image.ts': fileMapping.get(
                    'tests/dummy/app/components/widgets/widget-3/tour-schedule/responsive-image.ts'
                  ).input,
                },
              },
            },
          },
          'app.ts': fileMapping.get('tests/dummy/app/app.ts').input,
        },
      },
    },
  };

  const outputProject = {
    addon: {
      components: {
        'container-query.ts': fileMapping.get(
          'addon/components/container-query.ts'
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
                  'responsive-image.ts': fileMapping.get(
                    'tests/dummy/app/components/widgets/widget-3/tour-schedule/responsive-image.ts'
                  ).output,
                },
              },
            },
          },
          'app.ts': fileMapping.get('tests/dummy/app/app.ts').output,
        },
      },
    },
  };

  loadFixture(inputProject, options);

  // Run the step
  const augmentedOptions = {
    packages: {
      addon: {
        name: 'ember-container-query',
      },
    },
    projectRoot: 'tmp/ember-container-query-typescript',
  };

  useRelativePaths(augmentedOptions);

  assertFixture(outputProject, options);

  // Check idempotence
  useRelativePaths(augmentedOptions);

  assertFixture(outputProject, options);
});
