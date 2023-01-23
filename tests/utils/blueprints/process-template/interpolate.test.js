import { processTemplate } from '../../../../src/utils/blueprints.js';
import { assert, test } from '../../../helpers/testing.js';

test('utils | blueprints | process-template > interpolate', function () {
  const blueprintFile = [
    `packages:`,
    `  - '<%= options.packages.addon.name %>'`,
    `  - '<%= options.packages.testApp.name %>'`,
  ].join('\n');

  const file = processTemplate(blueprintFile, {
    options: {
      packages: {
        addon: {
          name: 'ember-container-query',
        },
        testApp: {
          name: 'test-app',
        },
      },
    },
  });

  const expectedValue = [
    `packages:`,
    `  - 'ember-container-query'`,
    `  - 'test-app'`,
  ].join('\n');

  assert.strictEqual(file, expectedValue);
});
