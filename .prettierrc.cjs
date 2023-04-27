'use strict';

module.exports = {
  overrides: [
    {
      files: '*.{cjs,js}',
      options: {
        printWidth: 80,
        singleQuote: true,
        trailingComma: 'all',
      },
    },
  ],
};
