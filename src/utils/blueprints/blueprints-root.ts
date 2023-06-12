import { join } from 'node:path';

import { getFilePath } from '@codemod-utils/blueprints';

const fileURL = import.meta.url;
const srcDirectory = join(getFilePath(fileURL), '../..');

export const blueprintsRoot = join(srcDirectory, 'blueprints');
