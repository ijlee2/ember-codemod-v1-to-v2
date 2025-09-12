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

  scripts.set('build', 'rollup --config');
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
    `concurrently \"${packageManager}:lint:*:fix\" --names \"fix:\"`,
  );
  scripts.set('lint:hbs', 'ember-template-lint .');
  scripts.set('lint:hbs:fix', 'ember-template-lint . --fix');
  scripts.set('lint:js', 'eslint . --cache');
  scripts.set('lint:js:fix', 'eslint . --fix');
  scripts.set('prepack', 'rollup --config');
  scripts.set('start', 'rollup --config --watch');
  scripts.set(
    'test',
    `echo \"A v2 addon does not have tests, run tests in ${packages.testApp.name}\"`,
  );

  if (packages.addon.hasTypeScript) {
    if (packages.addon.hasGlint) {
      scripts.set('lint:types', 'glint');
    } else {
      scripts.set('lint:types', 'tsc --emitDeclarationOnly false --noEmit');
    }
  }

  packageJson['scripts'] = convertToObject(scripts);
}
