import stripJsonComments from 'strip-json-comments';

export function sanitizeJson(jsonFile: string): string {
  return stripJsonComments(jsonFile, {
    whitespace: false,
  });
}
