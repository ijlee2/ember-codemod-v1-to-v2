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
} from '../../../../helpers/shared-test-setups/scoped.js';

test('migration | ember-addon | steps | update-addon-tsconfig-json > scoped', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/scoped/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-addon-tsconfig-json/scoped/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAddonTsconfigJson(options);

  assertFixture(outputProject, codemodOptions);
});
