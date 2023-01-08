import { mapFilePaths } from '../../src/utils/map-file-paths.js';
import { assert, test } from '../test-helpers.js';

test('utils | map-file-paths', function () {
  const filePaths = [
    'addon/components/container-query.hbs',
    'addon/components/container-query.ts',
    'addon/helpers/aspect-ratio.ts',
    'addon/helpers/height.ts',
    'addon/helpers/width.ts',
    'addon/modifiers/container-query.ts',
    'addon/styles/container-query.css',
    'addon/.gitkeep',
    'addon/index.ts',
    'addon/template-registry.ts',
  ];

  const pathMapping = mapFilePaths(filePaths, {
    from: 'addon',
    to: 'ember-container-query/src',
  });

  const expectedValue = new Map([
    [
      'addon/components/container-query.hbs',
      'ember-container-query/src/components/container-query.hbs',
    ],
    [
      'addon/components/container-query.ts',
      'ember-container-query/src/components/container-query.ts',
    ],
    [
      'addon/helpers/aspect-ratio.ts',
      'ember-container-query/src/helpers/aspect-ratio.ts',
    ],
    ['addon/helpers/height.ts', 'ember-container-query/src/helpers/height.ts'],
    ['addon/helpers/width.ts', 'ember-container-query/src/helpers/width.ts'],
    [
      'addon/modifiers/container-query.ts',
      'ember-container-query/src/modifiers/container-query.ts',
    ],
    [
      'addon/styles/container-query.css',
      'ember-container-query/src/styles/container-query.css',
    ],
    ['addon/.gitkeep', 'ember-container-query/src/.gitkeep'],
    ['addon/index.ts', 'ember-container-query/src/index.ts'],
    [
      'addon/template-registry.ts',
      'ember-container-query/src/template-registry.ts',
    ],
  ]);

  assert.deepStrictEqual(pathMapping, expectedValue);
});
