import { blueprintRoot } from '../../../src/utils/blueprints.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | blueprints | blueprint-root', function () {
  assert.strictEqual(
    blueprintRoot.endsWith('src/blueprints/ember-addon'),
    true,
  );
});
