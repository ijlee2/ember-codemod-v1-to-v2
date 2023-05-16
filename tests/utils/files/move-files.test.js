import { moveFiles } from '../../../src/utils/files.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';
import { assertFixture, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | move-files', function () {
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

  loadFixture(inputProject, codemodOptions);

  const filePathMap = new Map([
    [
      'addon/components/container-query.hbs',
      'ember-container-query/src/components/container-query.hbs',
    ],
    [
      'addon/components/container-query.ts',
      'ember-container-query/src/components/container-query.ts',
    ],
  ]);

  moveFiles(filePathMap, options);

  assertFixture(outputProject, codemodOptions);
});
