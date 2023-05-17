import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-container-query-scoped/input');
const outputProject = convertFixtureToJson('ember-container-query-scoped/output');

export { inputProject, outputProject };
