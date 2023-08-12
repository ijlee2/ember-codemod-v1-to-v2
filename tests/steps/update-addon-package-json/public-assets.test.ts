import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateAddonPackageJson } from '../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('migration | ember-addon | steps | update-addon-package-json > public-assets', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-package-json/public-assets/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-package-json/public-assets/output',
  );

  const context = {
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
  };

  loadFixture(inputProject, codemodOptions);

  updateAddonPackageJson(context, options);

  assertFixture(outputProject, codemodOptions);
});
