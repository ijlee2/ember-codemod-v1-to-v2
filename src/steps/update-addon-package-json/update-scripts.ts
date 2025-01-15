import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { Options, PackageJson } from '../../types/index.js';

export function updateScripts(
  packageJson: PackageJson,
  options: Options,
): void {
  const { locations, packageManager, packages } = options;

  const scripts = convertToMap(packageJson['scripts']);

  /*
    The codemod sets the scripts that v2 addons need. End-developers
    must add scripts that their v1 addon needed.
  */
  scripts.clear();

  scripts.set('build', 'rollup --config');
  scripts.set(
    'lint',
    // eslint-disable-next-line no-useless-escape
    `concurrently \"${packageManager}:lint:*(!fix)\" --names \"lint:\"`,
  );
  scripts.set(
    'lint:fix',
    // eslint-disable-next-line no-useless-escape
    `concurrently \"${packageManager}:lint:*:fix\" --names \"fix:\"`,
  );
  scripts.set(
    'lint:hbs',
    'ember-template-lint . --no-error-on-unmatched-pattern',
  );
  scripts.set(
    'lint:hbs:fix',
    'ember-template-lint . --fix --no-error-on-unmatched-pattern',
  );
  scripts.set('lint:js', 'eslint . --cache');
  scripts.set('lint:js:fix', 'eslint . --fix');
  scripts.set('prepack', 'rollup --config');
  scripts.set('start', 'rollup --config --watch');
  scripts.set(
    'test',
    // eslint-disable-next-line no-useless-escape
    `echo \"A v2 addon does not have tests, run tests in ${locations.testApp}\"`,
  );

  if (packages.addon.hasTypeScript) {
    scripts.delete('postpack');

    if (packages.addon.hasGlint) {
      scripts.set('lint:types', 'glint');
    } else {
      scripts.set('lint:types', 'tsc --emitDeclarationOnly false --noEmit');
    }
  }

  packageJson['scripts'] = convertToObject(scripts);
}
