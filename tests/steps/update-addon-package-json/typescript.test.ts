import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateAddonPackageJson } from '../../../src/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | update-addon-package-json > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-package-json/typescript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-package-json/typescript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonPackageJson(context, options);

  assertFixture(outputProject, codemodOptions);
});
