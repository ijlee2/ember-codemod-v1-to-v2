import { migrateEmberAddon } from './migration/index.js';

export function runCodemod(options) {
  migrateEmberAddon(options);
}
