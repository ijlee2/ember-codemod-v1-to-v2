import { moveFiles } from '../../../src/utils/files.js';
import { augmentedOptions, codemodOptions } from '../../helpers/shared-test-setups/typescript.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files > moveFiles', function () {
  const inputProject = {
    addon: {
      components: {
        'container-query.hbs': 'some code for container-query.hbs',
        'container-query.ts': 'some code for container-query.ts',
      },
    },

    app: {
      components: {
        'container-query.js': 'some code for container-query.js',
      },
    },
  };

  const outputProject = {
    'ember-container-query': {
      src: {
        components: {
          'container-query.hbs': 'some code for container-query.hbs',
          'container-query.ts': 'some code for container-query.ts',
        },
      },
    },

    app: {
      components: {
        'container-query.js': 'some code for container-query.js',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const migrationStrategy = new Map([
    [
      'addon/components/container-query.hbs',
      'ember-container-query/src/components/container-query.hbs',
    ],
    [
      'addon/components/container-query.ts',
      'ember-container-query/src/components/container-query.ts',
    ],
  ]);

  moveFiles(migrationStrategy, augmentedOptions);

  assertFixture(outputProject, codemodOptions);
});
