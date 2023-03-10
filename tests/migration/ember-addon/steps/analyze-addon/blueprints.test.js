import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | analyze-addon > blueprints', function () {
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

  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(analyzeAddon(options), {
    addon: {
      appReexports: [],
      publicAssets: [],
      publicEntrypoints: [],
    },
    projectRoot: {
      devDependencies: {
        concurrently: '^7.6.0',
        prettier: '^2.8.1',
      },
    },
  });
});
