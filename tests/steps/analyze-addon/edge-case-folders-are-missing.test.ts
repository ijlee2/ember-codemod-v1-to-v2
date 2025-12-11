import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeAddon } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | analyze-addon > edge case (folders are missing)', function () {
  const inputProject = {};

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeAddon(options), {
    addon: {
      hasBlueprints: false,
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
