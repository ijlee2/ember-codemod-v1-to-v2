import { createDirectory } from '../../../src/utils/files.js';
import { codemodOptions } from '../../helpers/shared-test-setups/typescript.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | create-directory > directory does not exist', function () {
  const inputProject = {};

  const outputProject = {
    addon: {
      components: {},
    },
  };

  loadFixture(inputProject, codemodOptions);

  const path = `${codemodOptions.projectRoot}/addon/components/ember-container-query.ts`;

  createDirectory(path);

  assertFixture(outputProject, codemodOptions);
});

test('utils | files | create-directory > directory exists', function () {
  const inputProject = {
    addon: {
      components: {},
    },
  };

  const outputProject = {
    addon: {
      components: {},
    },
  };

  loadFixture(inputProject, codemodOptions);

  const path = `${codemodOptions.projectRoot}/addon/components/ember-container-query.ts`;

  createDirectory(path);

  assertFixture(outputProject, codemodOptions);
});
