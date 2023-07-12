'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: true,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'typescript-sort-keys'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:n/recommended',
    'plugin:prettier/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  rules: {
    curly: 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  settings: {
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  overrides: [
    // TypeScript files
    {
      files: ['**/*.{cts,ts}'],
      extends: ['plugin:@typescript-eslint/recommended-type-checked'],
      rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
    // TypeScript and JavaScript files
    {
      files: ['**/*.{cjs,cts,js,ts}'],
      rules: {
        'import/no-duplicates': 'error',
      },
    },
    // Node files
    {
      files: ['./.eslintrc.{cjs,js}', './.prettierrc.{cjs,js}'],
      env: {
        browser: false,
        node: true,
      },
      extends: [
        'plugin:@typescript-eslint/disable-type-checked',
        'plugin:n/recommended',
      ],
    },
  ],
};
