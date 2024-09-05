export function assertZoeyExists(assert: Assert) {
  assert.dom('img').hasAttribute('src', '/my-addon/zoey.png');
}
