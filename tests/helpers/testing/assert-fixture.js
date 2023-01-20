import { strict as assert } from 'node:assert';

import fixturify from 'fixturify';

export function assertFixture(outputProject, options) {
  const { projectRoot } = options;

  assert.deepStrictEqual(fixturify.readSync(projectRoot), outputProject);
}
