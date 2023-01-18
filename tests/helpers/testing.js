import { strict as assert } from 'node:assert';
import { existsSync, rmSync } from 'node:fs';

import { test } from '@sondr3/minitest';
import fixturify from 'fixturify';

export function assertFixture(outputProject, options) {
  const { projectRoot } = options;

  assert.deepStrictEqual(fixturify.readSync(projectRoot), outputProject);
}

export function loadFixture(inputProject, options) {
  const { projectRoot } = options;

  if (existsSync(projectRoot)) {
    rmSync(projectRoot, { recursive: true });
  }

  fixturify.writeSync(projectRoot, inputProject);
}

export { assert, test };
