import { getVersion } from '../../../src/utils/blueprints.js';
import { options } from '../../helpers/shared-test-setups/typescript.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | blueprints | get-version', function () {
  const version = getVersion('prettier', options);

  assert.strictEqual(version, '^2.8.1');
});
