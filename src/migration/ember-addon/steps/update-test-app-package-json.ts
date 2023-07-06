import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
  readPackageJson,
} from '@codemod-utils/json';

import type { Options, PackageJson } from '../../../types/index.js';
import { getVersion } from '../../../utils/blueprints.js';

function moveDependenciesToDevDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  const dependencies = convertToMap(packageJson['dependencies']);
  const devDependencies = convertToMap(packageJson['devDependencies']);

  const packagesToMove = new Set([
    'ember-auto-import',
    'ember-cli-babel',
    'ember-cli-htmlbars',
  ]);

  if (packages.addon.hasTypeScript) {
    packagesToMove.add('ember-cli-typescript');
  }

  Array.from(packagesToMove)
    .filter((packageName) => dependencies.has(packageName))
    .forEach((packageName) => {
      const version = getVersion(packageName, options);

      devDependencies.set(packageName, version);

      dependencies.delete(packageName);
    });

  packageJson['dependencies'] = convertToObject(dependencies);
  packageJson['devDependencies'] = convertToObject(devDependencies);
}

function updateDependencies(packageJson: PackageJson): void {
  const dependencies = convertToMap(packageJson['dependencies']);

  /*
    For the time being, we'll take the approach of starting over and
    adding back the dependencies that are required.
  */
  dependencies.clear();

  packageJson['dependencies'] = convertToObject(dependencies);
}

function updateDevDependencies(
  packageJson: PackageJson,
  options: Options,
): void {
  const { packages } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  devDependencies.set(packages.addon.name, packages.addon.version);

  packageJson['devDependencies'] = convertToObject(devDependencies);
}

function updateOtherFields(packageJson: PackageJson, options: Options): void {
  const { packages } = options;

  delete packageJson['ember-addon'];

  packageJson['keywords'] = (packageJson['keywords'] ?? []).filter(
    (keyword: string) => keyword !== 'ember-addon',
  );

  packageJson['name'] = packages.testApp.name;

  packageJson['private'] = true;
}

export function updateTestAppPackageJson(options: Options): void {
  const { locations, projectRoot } = options;

  const packageJson = readPackageJson({
    projectRoot: join(projectRoot, locations.testApp),
  });

  moveDependenciesToDevDependencies(packageJson, options);
  updateDependencies(packageJson);
  updateDevDependencies(packageJson, options);
  updateOtherFields(packageJson, options);

  const destination = join(projectRoot, locations.testApp, 'package.json');
  const file = JSON.stringify(packageJson, null, 2) + '\n';

  writeFileSync(destination, file, 'utf8');
}
