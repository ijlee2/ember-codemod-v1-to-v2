import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeAddon } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | analyze-addon > public-assets', function () {
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

  assert.deepStrictEqual(analyzeAddon(options), {
    addon: {
      publicAssets: [
        'assets/documents/some-file.pdf',
        'assets/images/v1/some-file.svg',
      ],
    },
    projectRoot: {
      devDependencies: {
        concurrently: '^7.6.0',
      },
    },
  });
});
