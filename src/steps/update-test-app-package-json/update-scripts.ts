/* eslint-disable no-useless-escape */
import { convertToMap, convertToObject } from '@codemod-utils/package-json';

import type { Options, PackageJson } from '../../types/index.js';

export function updateScripts(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packageManager, packages } = options;

  const scripts = convertToMap(packageJson['scripts']);

  // Start over
  scripts.clear();

  scripts.set('build', 'ember build --environment=production');
  scripts.set('format', 'prettier . --cache --write');
  scripts.set(
    'lint',
    `concurrently \"${packageManager}:lint:*(!fix)\" --names \"lint:\"`,
  );
  scripts.set(
    'lint:css',
    'stylelint \"**/*.css\" --allow-empty-input --cache"',
  );
  scripts.set(
    'lint:css:fix',
    'stylelint \"**/*.css\" --allow-empty-input --fix',
  );
  scripts.set(
    'lint:fix',
    `concurrently \"${packageManager}:lint:*:fix\" --names \"fix:\" && ${packageManager} format`,
  );
  scripts.set('lint:format', 'prettier . --cache --check');
  scripts.set('lint:hbs', 'ember-template-lint .');
  scripts.set('lint:hbs:fix', 'ember-template-lint . --fix');
  scripts.set('lint:js', 'eslint . --cache');
  scripts.set('lint:js:fix', 'eslint . --fix');
  scripts.set('start', 'ember serve');
  scripts.set('test', 'ember test');
  scripts.set('test:ember-compatibility', 'ember try:one');

  if (packages.addon.hasTypeScript) {
    if (packages.addon.hasGlint) {
      scripts.set('lint:types', 'ember-tsc --noEmit');
    } else {
      scripts.set('lint:types', 'tsc --noEmit');
    }
  }

  packageJson['scripts'] = convertToObject(scripts);
}
