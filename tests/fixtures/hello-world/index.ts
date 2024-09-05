import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('hello-world/input');
const outputProject = convertFixtureToJson('hello-world/output');

export { inputProject, outputProject };
