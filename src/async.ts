import { emailValidatorAsync, save, notifyUser } from './vendor';

export type Validator = (value: string) => Promise<boolean>;

/** A general purpose validate function */
const validate = async (value: string, validators: Validator[]) => {
  const results = await Promise.all(validators.map(validator => validator(value)));
  if (results.some(result => result === false)) {
    return { value };
  } else {
    return { error: 'Invalid value' };
  }
}

/** If valid, save, else notify */
async function submit(email: string) {
  const result = await validate(email, [emailValidatorAsync]);
  if ('error' in result) {
    notifyUser(result.error);
    return;
  }
  save(result.value);
}