import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { codemodOptions } from '../../helpers/shared-test-setups/javascript.js';

test('steps | create-options > v2 addon', function () {
  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'ember-container-query',
        version: '3.2.0',
        private: true,
        workspaces: ['ember-container-query', 'test-app'],
      },
      null,
      2,
    ),
    'yarn.lock': '',
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), {
    locations: {
      addon: 'ember-container-query',
      testApp: 'test-app',
    },
    packageManager: 'yarn',
    packages: {
      addon: {
        dependencies: new Map(),
        hasGlint: false,
        hasTypeScript: false,
        isV1Addon: false,
        name: 'ember-container-query',
        version: '3.2.0',
      },
      testApp: {
        name: 'test-app',
      },
    },
    projectRoot: 'tmp/ember-container-query-javascript',
  });
});
