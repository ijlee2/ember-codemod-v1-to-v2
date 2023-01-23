import { moveAddonFiles } from '../../../../../src/migration/ember-addon/steps/index.js';
import {
  augmentedOptions,
  codemodOptions,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | move-addon-files > other files', function () {
  const inputProject = {
    'addon-test-support': {
      '.gitkeep': '',
    },
    blueprints: {
      '.gitkeep': '',
    },
  };

  const outputProject = {
    'ember-container-query': {
      blueprints: {
        '.gitkeep': '',
      },
      src: {
        'test-support': {
          '.gitkeep': '',
        },
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  moveAddonFiles(augmentedOptions);

  assertFixture(outputProject, codemodOptions);
});
