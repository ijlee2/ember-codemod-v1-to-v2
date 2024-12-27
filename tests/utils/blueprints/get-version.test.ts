import { assert, test } from '@codemod-utils/tests';

import { getLatestVersion, getVersion } from '../../../src/utils/blueprints.js';
import { options } from '../../helpers/shared-test-setups/typescript.js';

test('utils | blueprints | get-version', function () {
  assert.strictEqual(getLatestVersion('prettier'), '^3.4.2');
  assert.strictEqual(getVersion('prettier', options), '^2.8.1');
});
