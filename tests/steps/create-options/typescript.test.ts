import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { codemodOptions } from '../../helpers/shared-test-setups/typescript.js';

test('steps | create-options > typescript', function () {
  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'ember-container-query',
        version: '3.2.0',
        keywords: ['ember-addon'],
        dependencies: {
          'ember-cli-babel': '^7.26.11',
          'ember-cli-htmlbars': '^6.1.1',
        },
        devDependencies: {
          typescript: '^4.9.4',
        },
        'ember-addon': {
          configPath: 'tests/dummy/config',
        },
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
    packages: {
      addon: {
        dependencies: new Map([
          ['ember-cli-babel', '^7.26.11'],
          ['ember-cli-htmlbars', '^6.1.1'],
          ['typescript', '^4.9.4'],
        ]),
        hasGlint: false,
        hasTypeScript: true,
        isV1Addon: true,
        name: 'ember-container-query',
        version: '3.2.0',
      },
      testApp: {
        name: 'test-app',
      },
    },
    projectRoot: 'tmp/ember-container-query-typescript',
  });
});
