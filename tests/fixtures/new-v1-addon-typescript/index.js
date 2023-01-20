import { convertFixtureToJson } from '../../helpers/testing.js';

const inputProject = convertFixtureToJson('new-v1-addon-typescript/input');
const outputProject = convertFixtureToJson('new-v1-addon-typescript/output');

export { inputProject, outputProject };
