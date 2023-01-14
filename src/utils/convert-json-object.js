export function convertToMap(object = {}) {
  return new Map(Object.entries(object));
}

export function convertToObject(map) {
  const sortedMap = new Map([...map.entries()].sort());

  return Object.fromEntries(sortedMap);
}
