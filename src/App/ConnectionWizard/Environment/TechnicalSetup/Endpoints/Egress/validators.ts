import { createValidation, vd } from '@modusbox/modusbox-ui-components/dist/redux-validation';
import { portValidator, IPAddressValidator } from '../validators';

const getEgressPortValidation = () => createValidation([vd.isRequired, portValidator]);
const getEgressAddressValidation = () => createValidation([vd.isRequired, IPAddressValidator]);

export { getEgressAddressValidation, getEgressPortValidation };
