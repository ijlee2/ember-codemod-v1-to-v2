import { mapFilePaths } from '../../../src/utils/files.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | files | map-file-paths > base case', function () {
  const filePaths = ['addon/some-folder/some-file.ts', 'addon/.gitkeep'];

  const pathMapping = mapFilePaths(filePaths, {
    from: 'addon',
    to: 'new-location/src',
  });

  const expectedValue = new Map([
    [
      'addon/some-folder/some-file.ts',
      'new-location/src/some-folder/some-file.ts',
    ],
    ['addon/.gitkeep', 'new-location/src/.gitkeep'],
  ]);

  assert.deepStrictEqual(pathMapping, expectedValue);
});

test('utils | files | map-file-paths > file paths are mapped from the project root', function () {
  const filePaths = ['addon/some-folder/some-file.ts', 'addon/.gitkeep'];

  const pathMapping = mapFilePaths(filePaths, {
    from: '',
    to: 'new-location/src',
  });

  const expectedValue = new Map([
    [
      'addon/some-folder/some-file.ts',
      'new-location/src/addon/some-folder/some-file.ts',
    ],
    ['addon/.gitkeep', 'new-location/src/addon/.gitkeep'],
  ]);

  assert.deepStrictEqual(pathMapping, expectedValue);
});

test('utils | files | map-file-paths > file paths are mapped to the project root', function () {
  const filePaths = ['addon/some-folder/some-file.ts', 'addon/.gitkeep'];

  const pathMapping = mapFilePaths(filePaths, {
    from: 'addon',
    to: '',
  });

  const expectedValue = new Map([
    ['addon/some-folder/some-file.ts', 'some-folder/some-file.ts'],
    ['addon/.gitkeep', '.gitkeep'],
  ]);

  assert.deepStrictEqual(pathMapping, expectedValue);
});

test('utils | files | map-file-paths > file paths remain when there is no match', function () {
  const filePaths = ['.addon/index.js', 'addon', 'addon.js', 'app/index.js'];

  const pathMapping = mapFilePaths(filePaths, {
    from: 'addon',
    to: 'new-location/src',
  });

  const expectedValue = new Map([
    ['.addon/index.js', '.addon/index.js'],
    ['addon', 'addon'],
    ['addon.js', 'addon.js'],
    ['app/index.js', 'app/index.js'],
  ]);

  assert.deepStrictEqual(pathMapping, expectedValue);
});
