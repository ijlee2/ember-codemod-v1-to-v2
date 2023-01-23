import { createOptions } from '../../../../../src/migration/ember-addon/steps/index.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | create-options > typescript', function () {
  const codemodOptions = {
    addonLocation: undefined,
    projectRoot: 'tmp/new-v1-addon-typescript',
    testAppLocation: undefined,
    testAppName: undefined,
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
        devDependencies: {
          typescript: '^4.9.4',
        },
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
      addon: 'new-v1-addon',
      testApp: 'test-app',
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
          ['typescript', '^4.9.4'],
        ]),
        hasGlint: false,
        hasTypeScript: true,
        isV1Addon: true,
        name: 'new-v1-addon',
        version: '0.0.0',
      },
      testApp: {
        name: 'test-app',
      },
    },
    projectRoot: 'tmp/new-v1-addon-typescript',
  });
});
