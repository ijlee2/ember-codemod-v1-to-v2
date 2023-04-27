import { updateAddonPackageJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | update-addon-package-json > typescript', function () {
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
