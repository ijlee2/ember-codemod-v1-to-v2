#!/usr/bin/env node
// eslint-disable-next-line n/shebang
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runCodemod } from '../src/index.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = 'ember-codemod-v1-to-v2';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('addon-location', {
    describe: 'Location of the addon package',
    type: 'string',
  })
  .option('root', {
    describe: 'Location of your Ember addon',
    type: 'string',
  })
  .option('test-app-location', {
    describe: 'Location of the test-app package',
    type: 'string',
  })
  .option('test-app-name', {
    describe: 'Name of the test-app package',
    type: 'string',
  })
  .parseSync();

function castEmptyStringToUndefined(value?: string): string | undefined {
  return value === '' ? undefined : value;
}

const codemodOptions: CodemodOptions = {
  addonLocation: castEmptyStringToUndefined(argv['addon-location']),
  projectRoot: argv['root'] ?? process.cwd(),
  testAppLocation: castEmptyStringToUndefined(argv['test-app-location']),
  testAppName: castEmptyStringToUndefined(argv['test-app-name']),
};

runCodemod(codemodOptions);
