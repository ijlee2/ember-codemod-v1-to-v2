import { decideVersion } from '../../../src/utils/blueprints.js';
import { options } from '../../helpers/shared-test-setups/typescript.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | blueprints | decide-version > package is installed', function () {
  const version = decideVersion('prettier', options);

  assert.strictEqual(version, '^2.8.1');
});

test('utils | blueprints | decide-version > package is not installed and we provide the latest version', function () {
  const version = decideVersion('rollup', options);

  assert.strictEqual(version, '^3.21.0');
});

test('utils | blueprints | decide-version > package is not installed and we forgot to provide the latest version', function () {
  assert.throws(
    () => {
      decideVersion('some-package-not-part-of-blueprint', options);
    },
    (error) => {
      assert.strictEqual(
        error.message,
        'ERROR: The latest version of `some-package-not-part-of-blueprint` is unknown.\n',
      );

      return true;
    },
  );
});
