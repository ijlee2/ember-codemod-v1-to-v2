import { processTemplate } from '../../../../src/utils/blueprints.js';
import { assert, test } from '../../../helpers/testing.js';

test('utils | blueprints | process-template > escape', function () {
  const blueprintFile = '<%- context.htmlCode %>';

  const file = processTemplate(blueprintFile, {
    context: {
      htmlCode: '<em>I 🧡 container queries!</em>',
    },
  });

  const expectedValue = '&lt;em&gt;I 🧡 container queries!&lt;/em&gt;';

  assert.strictEqual(file, expectedValue);
});
