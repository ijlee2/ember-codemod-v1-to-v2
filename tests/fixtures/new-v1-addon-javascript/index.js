import { convertFixtureToJson } from '../../helpers/testing.js';

const inputProject = convertFixtureToJson('new-v1-addon-javascript/input');
const outputProject = convertFixtureToJson('new-v1-addon-javascript/output');

export { inputProject, outputProject };
