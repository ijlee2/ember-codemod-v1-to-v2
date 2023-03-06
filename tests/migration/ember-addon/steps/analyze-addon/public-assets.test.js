import { analyzeAddon } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | analyze-addon > public-assets', function () {
  const inputProject = {
    public: {
      assets: {
        documents: {
          'some-file.pdf': '',
        },
        images: {
          v1: {
            'some-file.svg': '',
          },
        },
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(analyzeAddon(options), {
    addon: {
      appReexports: [],
      publicAssets: [
        'assets/documents/some-file.pdf',
        'assets/images/v1/some-file.svg',
      ],
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
