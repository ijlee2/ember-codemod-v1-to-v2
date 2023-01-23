import { decideVersion } from '../../../src/utils/blueprints.js';
import { options } from '../../helpers/shared-test-setups/typescript.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | blueprints | decide-version > package is installed', function () {
  const version = decideVersion('prettier', options);

  assert.strictEqual(version, '^2.8.1');
});

test('utils | blueprints | decide-version > package is not installed', function () {
  const version = decideVersion('rollup', options);

  assert.strictEqual(version, '^3.10.0');
});
