import type { Options, PackageJson } from '../../types/index.js';

export function updateOtherFields(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  delete packageJson['ember-addon'];

  packageJson['keywords'] = (packageJson['keywords'] ?? []).filter(
    (keyword: string) => keyword !== 'ember-addon',
  );

  packageJson['name'] = packages.testApp.name;

  packageJson['private'] = true;
}
