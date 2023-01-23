import { removeFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | remove-files', function () {
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
    app: {
      components: {
        'container-query.js': 'some code for container-query.js',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const filePaths = [
    'addon/components/container-query.hbs',
    'addon/components/container-query.ts',
  ];

  removeFiles(filePaths, options);

  assertFixture(outputProject, codemodOptions);
});
