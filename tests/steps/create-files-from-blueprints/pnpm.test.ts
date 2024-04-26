import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createFilesFromBlueprints } from '../../../src/steps/index.js';
import {
  codemodOptions,
  context,
} from '../../helpers/shared-test-setups/typescript.js';

test('steps | create-files-from-blueprints > pnpm', function () {
  const inputProject = {};

  const outputProject = convertFixtureToJson(
    'steps/create-files-from-blueprints/pnpm/output',
  );

  loadFixture(inputProject, codemodOptions);

  const options = {
    locations: {
      addon: 'ember-container-query',
      testApp: 'test-app',
    },
    packageManager: 'pnpm' as const,
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
  };

  createFilesFromBlueprints(context, options);

  assertFixture(outputProject, codemodOptions);
});
