import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { moveAddonFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | move-addon-files > blueprints', function () {
  const inputProject = {
    blueprints: {
      'ember-container-query': {
        files: {
          'some-folder': {
            'some-file.ts': '',
          },
        },
        'index.ts': [
          `module.exports = {`,
          `  normalizeEntityName() {},`,
          `};`,
          ``,
        ].join('\n'),
      },
    },
  };

  const outputProject = {
    'ember-container-query': {
      blueprints: {
        'ember-container-query': {
          files: {
            'some-folder': {
              'some-file.ts': '',
            },
          },
          'index.ts': [
            `module.exports = {`,
            `  normalizeEntityName() {},`,
            `};`,
            ``,
          ].join('\n'),
        },
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  moveAddonFiles(options);

  assertFixture(outputProject, codemodOptions);
});
