import { createFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | create-files', function () {
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

  loadFixture(inputProject, codemodOptions);

  const fileMap = new Map([
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

  createFiles(fileMap, options);

  assertFixture(outputProject, codemodOptions);
});
