import { convertFixtureToJson } from '../../helpers/testing.js';

const inputProject = convertFixtureToJson('new-v1-addon-npm/input');
const outputProject = convertFixtureToJson('new-v1-addon-npm/output');

export { inputProject, outputProject };
