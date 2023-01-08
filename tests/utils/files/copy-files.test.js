import { copyFiles } from '../../../src/utils/files.js';
import { assertFixture, loadFixture, test } from '../../test-helpers.js';

test('utils | files > copyFiles', function () {
  const options = {
    projectRoot: 'tmp/ember-container-query-typescript',
  };

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

  loadFixture(inputProject, options);

  const migrationStrategy = new Map([
    ['.eslintrc.js', 'ember-container-query/.eslintrc.js'],
    ['package.json', 'ember-container-query/package.json'],
  ]);

  copyFiles(migrationStrategy, options);

  assertFixture(outputProject, options);
});
