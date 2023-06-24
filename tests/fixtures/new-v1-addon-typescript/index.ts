import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('new-v1-addon-typescript/input');
const outputProject = convertFixtureToJson('new-v1-addon-typescript/output');

export { inputProject, outputProject };
