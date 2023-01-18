import { moveFiles } from '../../../src/utils/files.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files > moveFiles', function () {
  const options = {
    projectRoot: 'tmp/ember-container-query-typescript',
  };

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

  loadFixture(inputProject, options);

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

  moveFiles(migrationStrategy, options);

  assertFixture(outputProject, options);
});
