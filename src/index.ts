import { migrateEmberAddon } from './migration/index.js';
import type { CodemodOptions } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): void {
  migrateEmberAddon(codemodOptions);
}
