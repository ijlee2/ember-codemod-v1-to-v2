'use strict';

export default {
  overrides: [
    {
      files: '*.{cjs,cts,js,mjs,mts,ts}',
      options: {
        printWidth: 80,
        singleQuote: true,
      },
    },
  ],
};
