import { processTemplate } from '../../../../src/utils/blueprints.js';
import { assert, test } from '../../../helpers/testing.js';

test('utils | blueprints | process-template > evaluate', function () {
  const blueprintFile = [
    `<% if (options.packageManager.isNpm) { %>{`,
    `  "scripts": {`,
    `    "prepare": "npm run build",`,
    `  },`,
    `}<% } else if (options.packageManager.isPnpm) { %>{`,
    `  "scripts": {`,
    `    "prepare": "pnpm build",`,
    `  },`,
    `}<% } else if (options.packageManager.isYarn) { %>{`,
    `  "scripts": {`,
    `    "prepare": "yarn build",`,
    `  },`,
    `}<% } %>`,
  ].join('\n');

  const file = processTemplate(blueprintFile, {
    options: {
      packageManager: {
        isNpm: false,
        isPnpm: false,
        isYarn: true,
      },
    },
  });

  const expectedValue = [
    `{`,
    `  "scripts": {`,
    `    "prepare": "yarn build",`,
    `  },`,
    `}`,
  ].join('\n');

  assert.strictEqual(file, expectedValue);
});
