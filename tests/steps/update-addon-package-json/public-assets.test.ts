import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateAddonPackageJson } from '../../../src/steps/index.js';
import type { Context } from '../../../src/types/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | update-addon-package-json > public-assets', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-package-json/public-assets/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-package-json/public-assets/output',
  );

  const context: Context = {
    addon: {
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
        prettier: '^2.8.1',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  updateAddonPackageJson(context, options);

  assertFixture(outputProject, codemodOptions);
});
