import { assert, test } from '@codemod-utils/tests';

import { getVersion } from '../../../src/utils/blueprints.js';
import { options } from '../../helpers/shared-test-setups/typescript.js';

test('utils | blueprints | get-version', function () {
  const version = getVersion('prettier', options);

  assert.strictEqual(version, '^2.8.1');
});
