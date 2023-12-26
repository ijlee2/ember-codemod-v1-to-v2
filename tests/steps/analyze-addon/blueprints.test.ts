import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeAddon } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | analyze-addon > blueprints', function () {
  const inputProject = {
    blueprints: {
      'some-command': {
        files: {
          'some-folder': {
            'some-file.ts': '',
          },
        },
        'index.js': [
          `'use strict';`,
          ``,
          `module.exports = {`,
          `  description: 'Generates something',`,
          `};`,
          ``,
        ].join('\n'),
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeAddon(options), {
    addon: {
      hasBlueprints: true,
      publicAssets: {},
    },
    projectRoot: {
      devDependencies: {
        concurrently: '^7.6.0',
      },
    },
  });
});
