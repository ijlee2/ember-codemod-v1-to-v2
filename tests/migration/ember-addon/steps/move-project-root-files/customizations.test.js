import { moveProjectRootFiles } from '../../../../../src/migration/ember-addon/steps/move-project-root-files.js';
import {
  augmentedOptions,
  options,
} from '../../../../helpers/shared-test-setups/customizations.js';
import {
  assertFixture,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-addon | steps | move-project-root-files > customizations', function () {
  const inputProject = {
    '.editorconfig': 'some code for .editorconfig',
    '.ember-cli': 'some code for .ember-cli',
    '.eslintignore': 'some code for .eslintignore',
    '.eslintrc.js': 'some code for .eslintrc.js',
    '.gitignore': 'some code for .gitignore',
    '.netlifyredirects': 'some code for .netlifyredirects',
    '.npmignore': 'some code for .npmignore',
    '.prettierignore': 'some code for .prettierignore',
    '.prettierrc.js': 'some code for .prettierrc.js',
    '.stylelintrc.js': 'some code for .stylelintrc.js',
    '.template-lintrc.js': 'some code for .template-lintrc.js',
    '.watchmanconfig': 'some code for .watchmanconfig',
    'CHANGELOG.md': 'some code for CHANGELOG.md',
    'CONTRIBUTING.md': 'some code for CONTRIBUTING.md',
    'ember-cli-build.js': 'some code for ember-cli-build.js',
    'index.js': 'some code for index.js',
    'LICENSE.md': 'some code for LICENSE.md',
    'package.json': 'some code for package.json',
    'README.md': 'some code for README.md',
    'testem.js': 'some code for testem.js',
    'tsconfig.json': 'some code for tsconfig.json',
    'yarn.lock': 'some code for yarn.lock',
  };

  const outputProject = {
    'demo-app': {
      '.ember-cli': 'some code for .ember-cli',
      '.eslintignore': 'some code for .eslintignore',
      '.eslintrc.js': 'some code for .eslintrc.js',
      '.gitignore': 'some code for .gitignore',
      '.prettierignore': 'some code for .prettierignore',
      '.prettierrc.js': 'some code for .prettierrc.js',
      '.stylelintrc.js': 'some code for .stylelintrc.js',
      '.template-lintrc.js': 'some code for .template-lintrc.js',
      '.watchmanconfig': 'some code for .watchmanconfig',
      'ember-cli-build.js': 'some code for ember-cli-build.js',
      'package.json': 'some code for package.json',
      'testem.js': 'some code for testem.js',
      'tsconfig.json': 'some code for tsconfig.json',
    },
    packages: {
      'ember-container-query': {
        '.eslintignore': 'some code for .eslintignore',
        '.eslintrc.js': 'some code for .eslintrc.js',
        '.gitignore': 'some code for .gitignore',
        '.prettierignore': 'some code for .prettierignore',
        '.prettierrc.js': 'some code for .prettierrc.js',
        '.stylelintrc.js': 'some code for .stylelintrc.js',
        '.template-lintrc.js': 'some code for .template-lintrc.js',
        'LICENSE.md': 'some code for LICENSE.md',
        'package.json': 'some code for package.json',
        'README.md': 'some code for README.md',
        'tsconfig.json': 'some code for tsconfig.json',
      },
    },
    '.editorconfig': 'some code for .editorconfig',
    '.netlifyredirects': 'some code for .netlifyredirects',
    'CHANGELOG.md': 'some code for CHANGELOG.md',
    'CONTRIBUTING.md': 'some code for CONTRIBUTING.md',
    'LICENSE.md': 'some code for LICENSE.md',
    'README.md': 'some code for README.md',
    'yarn.lock': 'some code for yarn.lock',
  };

  loadFixture(inputProject, options);

  moveProjectRootFiles(augmentedOptions);

  assertFixture(outputProject, options);
});
