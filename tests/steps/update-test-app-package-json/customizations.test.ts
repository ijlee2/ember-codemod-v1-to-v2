import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateTestAppPackageJson } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/customizations.js';

test('steps | update-test-app-package-json > customizations', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/customizations/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/customizations/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppPackageJson(options);

  assertFixture(outputProject, codemodOptions);
});
