import { createFiles } from '../../../src/utils/files.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files > createFiles', function () {
  const options = {
    projectRoot: 'tmp/ember-container-query-typescript',
  };

  const inputProject = {};

  const outputProject = {
    'ember-container-query': {
      'unpublished-development-types': {
        'index.d.ts': 'some code for index.d.ts',
      },

      'rollup.config.mjs': 'some code for rollup.config.mjs',
    },

    'package.json': 'some code for package.json',
  };

  loadFixture(inputProject, options);

  const fileMapping = new Map([
    [
      'ember-container-query/unpublished-development-types/index.d.ts',
      'some code for index.d.ts',
    ],
    [
      'ember-container-query/rollup.config.mjs',
      'some code for rollup.config.mjs',
    ],
    ['package.json', 'some code for package.json'],
  ]);

  createFiles(fileMapping, options);

  assertFixture(outputProject, options);
});
