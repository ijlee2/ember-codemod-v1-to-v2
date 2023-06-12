import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateTestAppPackageJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/scoped.js';

test('migration | ember-addon | steps | update-test-app-package-json > scoped', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/scoped/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-test-app-package-json/scoped/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateTestAppPackageJson(options);

  assertFixture(outputProject, codemodOptions);
});
