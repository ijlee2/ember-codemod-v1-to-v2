import { join } from 'node:path';

import { getFilePath } from '@codemod-utils/blueprints';

const fileURL = import.meta.url;

export const blueprintsRoot: string = join(
  getFilePath(fileURL),
  '../../blueprints',
);
