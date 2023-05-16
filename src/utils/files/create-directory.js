import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export function createDirectory(path) {
  const directory = dirname(path);

  if (existsSync(directory)) {
    return;
  }

  mkdirSync(directory, { recursive: true });
}
