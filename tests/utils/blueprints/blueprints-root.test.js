import { blueprintsRoot } from '../../../src/utils/blueprints.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | blueprints | blueprints-root', function () {
  assert.strictEqual(blueprintsRoot.endsWith('src/blueprints'), true);
});
