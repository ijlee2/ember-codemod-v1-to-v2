import { useRelativePaths } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/scoped.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | use-relative-paths > scoped', function () {
  const inputProject = convertFixtureToJson(
    'steps/use-relative-paths/scoped/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/use-relative-paths/scoped/output'
  );

  loadFixture(inputProject, codemodOptions);

  useRelativePaths(options);

  assertFixture(outputProject, codemodOptions);
});
