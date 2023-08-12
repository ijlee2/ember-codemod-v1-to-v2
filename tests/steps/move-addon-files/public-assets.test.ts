import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { moveAddonFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | move-addon-files > public-assets', function () {
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

  const outputProject = {
    'ember-container-query': {
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
    },
  };

  loadFixture(inputProject, codemodOptions);

  moveAddonFiles(options);

  assertFixture(outputProject, codemodOptions);
});
