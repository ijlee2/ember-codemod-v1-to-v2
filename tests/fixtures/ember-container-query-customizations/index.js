import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-container-query-customizations/input');
const outputProject = convertFixtureToJson('ember-container-query-customizations/output');

export { inputProject, outputProject };
