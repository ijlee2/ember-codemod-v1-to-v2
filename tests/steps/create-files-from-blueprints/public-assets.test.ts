import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createFilesFromBlueprints } from '../../../src/steps/index.js';
import type { Context } from '../../../src/types/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | create-files-from-blueprints > public-assets', function () {
  const inputProject = {};

  const outputProject = convertFixtureToJson(
    'steps/create-files-from-blueprints/public-assets/output',
  );

  const context: Context = {
    addon: {
      hasBlueprints: false,
      hasPublicAssets: true,
      publicAssets: {
        './public/assets/documents/some-file.pdf':
          '/ember-container-query/assets/documents/some-file.pdf',
        './public/assets/images/v1/some-file.svg':
          '/ember-container-query/assets/images/v1/some-file.svg',
      },
    },
    projectRoot: {
      devDependencies: {
        concurrently: '^7.6.0',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  createFilesFromBlueprints(context, options);

  assertFixture(outputProject, codemodOptions);
});
