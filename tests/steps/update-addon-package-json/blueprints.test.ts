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

test('steps | update-addon-package-json > blueprints', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-package-json/blueprints/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-package-json/blueprints/output',
  );

  const context: Context = {
    addon: {
      hasBlueprints: true,
      publicAssets: {},
    },
    projectRoot: {
      devDependencies: {
        concurrently: '^7.6.0',
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  updateAddonPackageJson(context, options);

  assertFixture(outputProject, codemodOptions);
});
