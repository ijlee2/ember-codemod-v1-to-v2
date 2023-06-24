import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-container-query-javascript/input');
const outputProject = convertFixtureToJson('ember-container-query-javascript/output');

export { inputProject, outputProject };
