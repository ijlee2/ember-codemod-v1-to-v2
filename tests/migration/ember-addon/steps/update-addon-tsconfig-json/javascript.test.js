import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateAddonTsconfigJson } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/javascript.js';

test('migration | ember-addon | steps | update-addon-tsconfig-json > javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonTsconfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
