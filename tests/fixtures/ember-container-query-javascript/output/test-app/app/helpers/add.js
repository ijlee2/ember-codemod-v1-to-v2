import { helper } from '@ember/component/helper';

const AddHelper = helper((positional) => {
  const sum = positional.reduce((accumulator, value) => accumulator + value, 0);

  return sum;
});

export default AddHelper;
