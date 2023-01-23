import { sanitizeJson } from '../../../src/utils/json.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | json | sanitize-json', function () {
  const jsonFile = [
    `{`,
    `  "extends": "@tsconfig/ember/tsconfig.json",`,
    `  "compilerOptions": {`,
    `    // Don't check the types of dependencies`,
    `    "skipLibCheck": true,`,
    ``,
    `    // The combination of \`baseUrl\` with \`paths\` allows Ember's classic package`,
    `    // layout, which is not resolveable with the Node resolution algorithm, to`,
    `    // work with TypeScript.`,
    `    "baseUrl": ".",`,
    `    "paths": {`,
    `      /* ... */`,
    `    }`,
    `  }`,
    `}`,
  ].join('\n');

  const expectedValue = [
    `{`,
    `  "extends": "@tsconfig/ember/tsconfig.json",`,
    `  "compilerOptions": {`,
    `    `,
    `    "skipLibCheck": true,`,
    ``,
    `    `,
    `    `,
    `    `,
    `    "baseUrl": ".",`,
    `    "paths": {`,
    `      `,
    `    }`,
    `  }`,
    `}`,
  ].join('\n');

  assert.strictEqual(sanitizeJson(jsonFile), expectedValue);
});
