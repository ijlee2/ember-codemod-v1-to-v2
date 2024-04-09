import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginNode from 'eslint-plugin-n';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import typescriptEslint from 'typescript-eslint';

// eslint-import-resolver-typescript
// eslint-plugin-import
// eslint-plugin-typescript-sort-keys

export default [
  // Globally ignore files
  {
    ignores: [
      '{dist,dist-for-testing,tmp}/**/*',
      'src/blueprints/**/*',
      'tests/fixtures/**/*',
    ],
  },

  // @eslint/js, typescript-eslint
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommended,

  // eslint-plugin-simple-import-sort
  {
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // eslint-plugin-n
  {
    ...pluginNode.configs['flat/recommended-script'],
    files: ['{bin,src,tests}/**/*.{js,ts}'],
  },
  {
    files: ['bin/**/*.{js,ts}'],
    rules: {
      'n/hashbang': 'off',
    },
  },
  {
    ...pluginNode.configs['flat/recommended-module'],
    files: ['*.{mjs,mts}'],
  },

  // eslint-config-prettier, eslint-plugin-prettier
  eslintConfigPrettier,
  pluginPrettier,
];
