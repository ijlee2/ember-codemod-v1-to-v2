import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('new-v1-addon-pnpm/input');
const outputProject = convertFixtureToJson('new-v1-addon-pnpm/output');

export { inputProject, outputProject };
