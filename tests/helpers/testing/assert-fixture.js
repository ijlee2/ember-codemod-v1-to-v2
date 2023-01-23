import { strict as assert } from 'node:assert';

import fixturify from 'fixturify';

export function assertFixture(outputProject, codemodOptions) {
  const { projectRoot } = codemodOptions;

  assert.deepStrictEqual(fixturify.readSync(projectRoot), outputProject);
}
