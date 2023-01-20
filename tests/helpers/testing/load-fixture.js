import { existsSync, rmSync } from 'node:fs';

import fixturify from 'fixturify';

export function loadFixture(inputProject, options) {
  const { projectRoot } = options;

  if (existsSync(projectRoot)) {
    rmSync(projectRoot, { recursive: true });
  }

  fixturify.writeSync(projectRoot, inputProject);
}
