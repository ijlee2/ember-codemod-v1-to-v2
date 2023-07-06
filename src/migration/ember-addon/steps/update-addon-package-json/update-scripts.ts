import { convertToMap, convertToObject } from '@codemod-utils/json';

import type { Options, PackageJson } from '../../../../types/index.js';

export function updateScripts(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  const scripts = convertToMap(packageJson['scripts']);

  if (packages.addon.hasTypeScript) {
    scripts.set('build', 'concurrently "npm:build:*" --names "build:"');
    scripts.set('build:js', 'rollup --config');
    scripts.set(
      'build:types',
      packages.addon.hasGlint ? 'glint --declaration' : 'tsc',
    );

    scripts.set(
      'lint:types',
      packages.addon.hasGlint
        ? 'glint'
        : 'tsc --emitDeclarationOnly false --noEmit',
    );

    scripts.set('prepack', 'rollup --config');

    scripts.set('start', 'concurrently "npm:start:*" --names "start:"');
    scripts.set('start:js', 'rollup --config --watch --no-watch.clearScreen');
    scripts.set(
      'start:types',
      packages.addon.hasGlint ? 'glint --declaration --watch' : 'tsc --watch',
    );

    scripts.set(
      'test',
      "echo 'A v2 addon does not have tests, run tests in test-app'",
    );
  } else {
    scripts.set('build', 'rollup --config');
    scripts.set('prepack', 'rollup --config');
    scripts.set('start', 'rollup --config --watch');
    scripts.set(
      'test',
      "echo 'A v2 addon does not have tests, run tests in test-app'",
    );
  }

  packageJson['scripts'] = convertToObject(scripts);
}
