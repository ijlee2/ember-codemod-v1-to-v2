import stripJsonComments from 'strip-json-comments';

export function sanitizeJson(jsonFile) {
  return stripJsonComments(jsonFile, {
    whitespace: false,
  });
}
