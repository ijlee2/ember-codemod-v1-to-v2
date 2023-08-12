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
} from '../../helpers/shared-test-setups/glint.js';

test('steps | update-test-app-package-json > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/glint/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppPackageJson(options);

  assertFixture(outputProject, codemodOptions);
});
