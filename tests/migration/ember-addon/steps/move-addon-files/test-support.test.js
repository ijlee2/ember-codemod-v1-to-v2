import { moveAddonFiles } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | move-addon-files > test-support', function () {
  const inputProject = {
    'addon-test-support': {
      components: {
        'container-query.ts': '',
      },
      'index.ts': `export * from './components/container-query';\n`,
    },
  };

  const outputProject = {
    'ember-container-query': {
      src: {
        'test-support': {
          components: {
            'container-query.ts': '',
          },
          'index.ts': `export * from './components/container-query';\n`,
        },
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  moveAddonFiles(options);

  assertFixture(outputProject, codemodOptions);
});
