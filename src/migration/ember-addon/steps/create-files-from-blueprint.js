import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { processTemplate } from '@codemod-utils/blueprints';
import { createFiles, findFiles } from '@codemod-utils/files';

import { blueprintsRoot } from '../../../utils/blueprints.js';

function getFilesToSkip(options) {
  const { packageManager, packages } = options;

  const files = new Set();

  if (!packages.addon.hasTypeScript) {
    files.add('__addonLocation__/unpublished-development-types/index.d.ts');
    files.add('__testAppLocation__/types/global.d.ts');
  }

  if (!packageManager.isPnpm) {
    files.add('pnpm-workspace.yaml');
  }

  return [...files];
}

function resolveBlueprintFilePath(blueprintFilePath, options) {
  const { locations } = options;

  return blueprintFilePath
    .replace('__addonLocation__', locations.addon)
    .replace('__gitignore__', '.gitignore')
    .replace('__testAppLocation__', locations.testApp);
}

export function createFilesFromBlueprint(context, options) {
  const filesToSkip = getFilesToSkip(options);
  const cwd = join(blueprintsRoot, 'ember-addon');

  const blueprintFilePaths = findFiles('**/*', {
    cwd,
    ignoreList: filesToSkip,
  });

  const fileMap = new Map(
    blueprintFilePaths.map((blueprintFilePath) => {
      const filePath = resolveBlueprintFilePath(blueprintFilePath, options);

      const blueprintFile = readFileSync(join(cwd, blueprintFilePath), 'utf8');

      const file = processTemplate(blueprintFile, {
        context,
        options,
      });

      return [filePath, file];
    }),
  );

  createFiles(fileMap, options);
}
