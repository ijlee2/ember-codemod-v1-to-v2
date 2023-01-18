import { removeFiles } from '../../../src/utils/files.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files > removeFiles', function () {
  const options = {
    projectRoot: 'tmp/ember-container-query-typescript',
  };

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

  loadFixture(inputProject, options);

  const migrationStrategy = new Map([
    ['app/components/container-query.js', 'app/components/container-query.js'],
  ]);

  removeFiles(migrationStrategy, options);

  assertFixture(outputProject, options);
});
