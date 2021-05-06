import { createValidation, vd } from '@modusbox/modusbox-ui-components/dist/redux-validation';

const getDfspConfigValidation = () => ({
  id: createValidation([vd.isRequired]),
  name: createValidation([vd.isRequired]),
});

export { getDfspConfigValidation };
