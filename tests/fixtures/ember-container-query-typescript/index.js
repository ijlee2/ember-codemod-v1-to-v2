import { convertFixtureToJson } from '../../helpers/testing.js';

const inputProject = convertFixtureToJson('ember-container-query-typescript/input');
const outputProject = convertFixtureToJson('ember-container-query-typescript/output');

export { inputProject, outputProject };
