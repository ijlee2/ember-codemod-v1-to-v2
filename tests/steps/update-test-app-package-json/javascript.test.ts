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
} from '../../helpers/shared-test-setups/javascript.js';

test('migration | ember-addon | steps | update-test-app-package-json > javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppPackageJson(options);

  assertFixture(outputProject, codemodOptions);
});
