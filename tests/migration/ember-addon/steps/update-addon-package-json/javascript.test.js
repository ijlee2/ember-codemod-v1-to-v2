import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateAddonPackageJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/javascript.js';

test('migration | ember-addon | steps | update-addon-package-json > javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-package-json/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-package-json/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonPackageJson(context, options);

  assertFixture(outputProject, codemodOptions);
});
