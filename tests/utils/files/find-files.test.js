import { findFiles } from '../../../src/utils/files.js';
import { codemodOptions } from '../../helpers/shared-test-setups/typescript.js';
import { assert, loadFixture, test } from '../../helpers/testing.js';

test('utils | files | find-files', function () {
  const inputProject = {
    tests: {
      dummy: {
        app: {
          '.eslintrc.js': '',
          'app.ts': '',
          'index.html': '',
          'router.ts': '',
        },
        config: {
          'environment.js': '',
          'optional-features.json': '',
          'targets.js': '',
        },
      },
      integration: {
        components: {
          'container-query-test.ts': '',
        },
      },
      'index.html': '',
      'test-helper.ts': '',
    },
    'ember-cli-build.js': '',
    'index.js': '',
    'package.json': '',
  };

  loadFixture(inputProject, codemodOptions);

  let filePaths = findFiles('tests/dummy/**/*.{js,ts}', {
    cwd: codemodOptions.projectRoot,
  });

  assert.deepStrictEqual(filePaths.sort(), [
    'tests/dummy/app/.eslintrc.js',
    'tests/dummy/app/app.ts',
    'tests/dummy/app/router.ts',
    'tests/dummy/config/environment.js',
    'tests/dummy/config/targets.js',
  ]);

  filePaths = findFiles('tests/**/*.{js,ts}', {
    cwd: codemodOptions.projectRoot,
    ignoreList: ['tests/dummy/**/*'],
  });

  assert.deepStrictEqual(filePaths.sort(), [
    'tests/integration/components/container-query-test.ts',
    'tests/test-helper.ts',
  ]);
});
