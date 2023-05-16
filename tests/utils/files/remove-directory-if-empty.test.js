import { removeDirectoryIfEmpty } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | remove-directory-if-empty > parent directories are empty', function () {
  const inputProject = {
    addon: {
      components: {},
    },
  };

  const outputProject = {};

  loadFixture(inputProject, codemodOptions);

  removeDirectoryIfEmpty('addon/components/container-query.ts', options);

  assertFixture(outputProject, codemodOptions);
});

test('utils | files | remove-directory-if-empty > a parent directory is not empty', function () {
  const inputProject = {
    addon: {
      components: {},
      '.gitkeep': '',
    },
  };

  const outputProject = {
    addon: {
      '.gitkeep': '',
    },
  };

  loadFixture(inputProject, codemodOptions);

  removeDirectoryIfEmpty('addon/components/container-query.ts', options);

  assertFixture(outputProject, codemodOptions);
});
