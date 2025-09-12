import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { codemodOptions } from '../../helpers/shared-test-setups/customizations.js';

test('steps | create-options > customizations', function () {
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
        devDependencies: {},
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
      addon: 'packages/ember-container-query',
      testApp: 'demo-app',
    },
    packageManager: 'yarn',
    packages: {
      addon: {
        dependencies: new Map([
          ['ember-cli-babel', '^7.26.11'],
          ['ember-cli-htmlbars', '^6.1.1'],
        ]),
        hasGlint: false,
        hasTypeScript: false,
        isV1Addon: true,
        name: 'ember-container-query',
        version: '3.2.0',
      },
      testApp: {
        name: 'demo-app-for-ember-container-query',
      },
    },
    projectRoot: 'tmp/ember-container-query-customizations',
  });
});
