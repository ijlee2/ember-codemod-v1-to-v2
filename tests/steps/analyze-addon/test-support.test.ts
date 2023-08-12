import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeAddon } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | analyze-addon > test-support', function () {
  const inputProject = {
    'addon-test-support': {
      components: {
        'container-query.ts': '',
      },
      'index.ts': `export * from './components/container-query';\n`,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeAddon(options), {
    addon: {
      appReexports: [],
      publicAssets: [],
      publicEntrypoints: [
        'test-support/components/container-query.js',
        'test-support/index.js',
      ],
    },
    projectRoot: {
      devDependencies: {
        concurrently: '^7.6.0',
      },
    },
  });
});
