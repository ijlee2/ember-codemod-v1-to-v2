import { modifier } from 'ember-modifier';

const DynamicCssGridModifier = modifier(
  (element, _positional, named) => {
    const { numColumns, numRows } = named;

    element.style.gridTemplateColumns = `repeat(${numColumns}, minmax(0, 1fr))`;
    element.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
  },
  { eager: false }
);

export default DynamicCssGridModifier;
