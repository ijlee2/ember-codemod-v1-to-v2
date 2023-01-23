import { migrateEmberAddon } from './migration/index.js';

export function runCodemod(codemodOptions) {
  migrateEmberAddon(codemodOptions);
}
