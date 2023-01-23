export function sanitizeJson(jsonFile) {
  // Remove comments
  return jsonFile.replace(new RegExp('//.*', 'gm'), '');
}
