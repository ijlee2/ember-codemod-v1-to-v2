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

  scripts.set(
    'lint',
    `concurrently '${packageManager}:lint:*(!fix)' --names 'lint:'`,
  );
  scripts.set(
    'lint:fix',
    `concurrently '${packageManager}:lint:*:fix' --names 'fix:'`,
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
  scripts.set(
    'test',
    `echo 'A v2 addon does not have tests, run tests in ${locations.testApp}'`,
  );

  if (packages.addon.hasTypeScript) {
    scripts.set('build', `concurrently "${packageManager}:build:*"`);
    scripts.set('build:js', 'rollup --config');
    scripts.delete('postpack');
    scripts.set('prepack', `concurrently '${packageManager}:build:*'`);
    scripts.set('start', `concurrently "${packageManager}:start:*"`);
    scripts.set('start:js', 'rollup --config --watch --no-watch.clearScreen');

    if (packages.addon.hasGlint) {
      scripts.set('build:types', 'glint --declaration');
      scripts.set('lint:types', 'glint');
      scripts.set('start:types', 'glint --declaration --watch');
    } else {
      scripts.set('build:types', 'tsc');
      scripts.set('lint:types', 'tsc --emitDeclarationOnly false --noEmit');
      scripts.set('start:types', 'tsc --watch');
    }
  } else {
    scripts.set('build', 'rollup --config');
    scripts.set('prepack', 'rollup --config');
    scripts.set('start', 'rollup --config --watch');
  }

  packageJson['scripts'] = convertToObject(scripts);
}
