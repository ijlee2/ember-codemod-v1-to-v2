import { convertFixtureToJson } from '../../helpers/testing.js';

const inputProject = convertFixtureToJson('new-v1-addon-customizations/input');
const outputProject = convertFixtureToJson('new-v1-addon-customizations/output');

export { inputProject, outputProject };
