import { removeFiles } from '../../../src/utils/files.js';
import { augmentedOptions, codemodOptions } from '../../helpers/shared-test-setups/typescript.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files > removeFiles', function () {
  const inputProject = {
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

  const outputProject = {
    'ember-container-query': {
      src: {
        components: {
          'container-query.hbs': 'some code for container-query.hbs',
          'container-query.ts': 'some code for container-query.ts',
        },
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const migrationStrategy = new Map([
    ['app/components/container-query.js', 'app/components/container-query.js'],
  ]);

  removeFiles(migrationStrategy, augmentedOptions);

  assertFixture(outputProject, codemodOptions);
});
