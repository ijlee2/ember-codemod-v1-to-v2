import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
} from '../../../utils/convert-json-object.js';
import { decideVersion } from '../../../utils/decide-version.js';

function moveDependenciesToDevDependencies(packageJson, options) {
  const { packages } = options;

  const dependencies = convertToMap(packageJson['dependencies']);
  const devDependencies = convertToMap(packageJson['devDependencies']);

  const packagesToMove = packages.addon.hasTypeScript
    ? [
        'ember-auto-import',
        'ember-cli-babel',
        'ember-cli-htmlbars',
        'ember-cli-typescript',
      ]
    : ['ember-auto-import', 'ember-cli-babel', 'ember-cli-htmlbars'];

  packagesToMove.forEach((packageName) => {
    const version = decideVersion(packageName, dependencies);

    devDependencies.set(packageName, version);

    dependencies.delete(packageName);
  });

  packageJson['dependencies'] = convertToObject(dependencies);
  packageJson['devDependencies'] = convertToObject(devDependencies);
}

function updateDependencies(packageJson) {
  const dependencies = convertToMap(packageJson['dependencies']);

  // May be easier to start over and add missing dependencies
  dependencies.clear();

  packageJson['dependencies'] = convertToObject(dependencies);
}

function updateDevDependencies(packageJson, options) {
  const { packages } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  devDependencies.set(packages.addon.name, packages.addon.version);

  packageJson['devDependencies'] = convertToObject(devDependencies);
}

function updateOtherFields(packageJson, options) {
  const { packages } = options;

  delete packageJson['ember-addon'];

  packageJson['keywords'] = packageJson['keywords'].filter((keyword) => {
    return keyword !== 'ember-addon';
  });

  packageJson['name'] = packages.testApp.name;

  packageJson['private'] = true;
}

export function updateTestAppPackageJson(options) {
  const { locations, projectRoot } = options;

  const oldPath = join(projectRoot, locations.testApp, 'package.json');
  const oldFile = readFileSync(oldPath, 'utf8');
  const packageJson = JSON.parse(oldFile);

  moveDependenciesToDevDependencies(packageJson, options);
  updateDependencies(packageJson);
  updateDevDependencies(packageJson, options);
  updateOtherFields(packageJson, options);

  const newFile = JSON.stringify(packageJson, null, 2) + '\n';

  writeFileSync(oldPath, newFile, 'utf8');
}
