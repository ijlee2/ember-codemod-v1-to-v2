import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';

test('steps | create-options > pnpm', function () {
  const codemodOptions = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-pnpm',
    testAppLocation: undefined,
    testAppName: undefined,
  };

  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'new-v1-addon',
        version: '0.0.0',
        keywords: ['ember-addon'],
        dependencies: {
          'ember-cli-babel': '^7.26.11',
          'ember-cli-htmlbars': '^6.1.1',
        },
        devDependencies: {},
        'ember-addon': {
          configPath: 'tests/dummy/config',
        },
      },
      null,
      2,
    ),
    'pnpm-lock.yaml': '',
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), {
    locations: {
      addon: 'new-v1-addon',
      testApp: 'test-app',
    },
    packageManager: 'pnpm',
    packages: {
      addon: {
        dependencies: new Map([
          ['ember-cli-babel', '^7.26.11'],
          ['ember-cli-htmlbars', '^6.1.1'],
        ]),
        hasGlint: false,
        hasTypeScript: false,
        isV1Addon: true,
        name: 'new-v1-addon',
        version: '0.0.0',
      },
      testApp: {
        name: 'test-app',
      },
    },
    projectRoot: 'tmp/new-v1-addon-pnpm',
  });
});
