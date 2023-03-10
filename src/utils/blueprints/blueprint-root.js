import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getBlueprintRoot() {
  const srcDirectory = join(__dirname, '../..');

  return join(srcDirectory, 'blueprints/ember-addon');
}

export const blueprintRoot = getBlueprintRoot();
