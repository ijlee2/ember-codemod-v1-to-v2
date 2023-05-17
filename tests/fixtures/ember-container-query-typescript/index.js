import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-container-query-typescript/input');
const outputProject = convertFixtureToJson('ember-container-query-typescript/output');

export { inputProject, outputProject };
