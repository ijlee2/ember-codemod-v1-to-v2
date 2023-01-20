import { convertFixtureToJson } from '../../helpers/testing.js';

const inputProject = convertFixtureToJson('ember-container-query-customizations/input');
const outputProject = convertFixtureToJson('ember-container-query-customizations/output');

export { inputProject, outputProject };
