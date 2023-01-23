export function convertToObject(map) {
  const sortedMap = new Map([...map.entries()].sort());

  return Object.fromEntries(sortedMap);
}
