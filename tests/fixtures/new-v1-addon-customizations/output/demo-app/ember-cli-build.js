'use strict';

const sideWatch = require('@embroider/broccoli-side-watch');
const { maybeEmbroider } = require('@embroider/test-setup');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: ['new-v1-addon'],
    },
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
    trees: {
      app: sideWatch('app', {
        watching: ['new-v1-addon'],
      }),
    },
  });

  return maybeEmbroider(app);
};
