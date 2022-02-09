import { emailValidator, save, notifyUser } from './vendor';

type Validator = (value: string) => boolean;

type ValidateResult = { value: string } | { error: string };

/** A general purpose validate function */
const validate = (value: string, validators: Validator[]): ValidateResult => {
  const isValid = validators.some(validator => validator(value) === false);
  if (isValid) {
    return { value };
  } else {
    return { error: 'Invalid value' };
  }
}

/** If valid, save, else notify */
function submit(email: string) {
  const result = validate(email, [emailValidator]);
  if ('error' in result) {
    notifyUser(result.error);
    return;
  }
  save(result.value);
}