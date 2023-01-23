import { createOptions } from '../../../../../src/migration/ember-addon/steps/index.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-options > customizations', function () {
  const codemodOptions = {
    addonLocation: 'packages/new-v1-addon',
    projectRoot: 'tmp/new-v1-addon-customizations',
    testAppLocation: 'demo-app',
    testAppName: 'demo-app-for-new-v1-addon',
  };

  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'new-v1-addon',
        version: '0.0.0',
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
      2
    ),
    'yarn.lock': '',
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(createOptions(codemodOptions), {
    locations: {
      addon: 'packages/new-v1-addon',
      testApp: 'demo-app',
    },
    packageManager: {
      isNpm: false,
      isPnpm: false,
      isYarn: true,
    },
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
        name: 'demo-app-for-new-v1-addon',
      },
    },
    projectRoot: 'tmp/new-v1-addon-customizations',
  });
});
