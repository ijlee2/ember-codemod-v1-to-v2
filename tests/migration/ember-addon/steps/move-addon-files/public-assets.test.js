import { moveAddonFiles } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | move-addon-files > public-assets', function () {
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
