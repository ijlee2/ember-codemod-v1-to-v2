import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import glob from 'glob';

import { createFiles } from '../../../utils/files.js';
import { processTemplate } from '../../../utils/process-template.js';

function getFilePath(blueprintFilePath, options) {
  const { locations } = options;

  return blueprintFilePath
    .replace('__addonLocation__', locations.addon)
    .replace('__gitignore__', '.gitignore')
    .replace('__testAppLocation__', locations.testApp);
}

function getFilesToSkip(options) {
  const { packageManager, packages } = options;

  const files = new Set();

  if (packages.addon.hasTypeScript) {
    files.add('__addonLocation__/rollup.config.js');
  } else {
    files.add('__addonLocation__/rollup.config.mjs');
    files.add('__addonLocation__/unpublished-development-types/index.d.ts');
    files.add('__testAppLocation__/types/global.d.ts');
  }

  if (!packageManager.isPnpm) {
    files.add('pnpm-workspace.yaml');
  }

  return [...files];
}

export function createFilesFromBlueprint(context, options) {
  const blueprintRoot = 'src/blueprints/ember-addon';

  const filesToSkip = getFilesToSkip(options);

  const blueprintFilePaths = glob.sync('**/*', {
    cwd: blueprintRoot,
    dot: true,
    ignore: filesToSkip,
    nodir: true,
  });

  const fileMapping = new Map(
    blueprintFilePaths.map((blueprintFilePath) => {
      const filePath = getFilePath(blueprintFilePath, options);

      const blueprintFile = readFileSync(
        join(blueprintRoot, blueprintFilePath),
        'utf8'
      );

      const file = processTemplate(blueprintFile, {
        context,
        options,
      });

      return [filePath, file];
    })
  );

  createFiles(fileMapping, options);
}
