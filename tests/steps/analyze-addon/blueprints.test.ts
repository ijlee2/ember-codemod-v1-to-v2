import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

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
        'index.js': normalizeFile([
          `'use strict';`,
          ``,
          `module.exports = {`,
          `  description: 'Generates something',`,
          `};`,
          ``,
        ]),
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeAddon(options), {
    addon: {
      hasBlueprints: true,
      hasPublicAssets: false,
      publicAssets: {},
    },
    projectRoot: {
      devDependencies: {
        concurrently: '^9.2.1',
        pnpm: '10.25.0',
      },
    },
  });
});
