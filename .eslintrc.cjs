'use strict';

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    curly: 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  env: {
    es6: true,
    node: true,
  },
  overrides: [],
};
