import { copyFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | copy-files', function () {
  const inputProject = {
    '.editorconfig': 'some code for .editorconfig',
    '.eslintrc.js': 'some code for .eslintrc.js',
    'package.json': 'some code for package.json',
  };

  const outputProject = {
    'ember-container-query': {
      '.eslintrc.js': 'some code for .eslintrc.js',
      'package.json': 'some code for package.json',
    },

    '.editorconfig': 'some code for .editorconfig',
    '.eslintrc.js': 'some code for .eslintrc.js',
    'package.json': 'some code for package.json',
  };

  loadFixture(inputProject, codemodOptions);

  const filePathMap = new Map([
    ['.eslintrc.js', 'ember-container-query/.eslintrc.js'],
    ['package.json', 'ember-container-query/package.json'],
  ]);

  copyFiles(filePathMap, options);

  assertFixture(outputProject, codemodOptions);
});
