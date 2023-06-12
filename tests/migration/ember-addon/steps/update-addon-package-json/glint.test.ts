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
} from '../../../../helpers/shared-test-setups/glint.js';

test('migration | ember-addon | steps | update-addon-package-json > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-package-json/glint/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-package-json/glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonPackageJson(context, options);

  assertFixture(outputProject, codemodOptions);
});
