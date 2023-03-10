import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | analyze-addon > test-support', function () {
  const inputProject = {
    'addon-test-support': {
      components: {
        'container-query.ts': '',
      },
      'index.ts': `export * from './components/container-query';\n`,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(analyzeAddon(options), {
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
        prettier: '^2.8.1',
      },
    },
  });
});
