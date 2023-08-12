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
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | update-test-app-package-json > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/typescript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/typescript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppPackageJson(options);

  assertFixture(outputProject, codemodOptions);
});
