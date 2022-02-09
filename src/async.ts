import { save, notifyUser } from './vendor';

function isNegative(value: number): Promise<{ value: number } | { error: string }> {
  return new Promise((res, rej) => {
    if (value < 0 /** Place holder for complex logic */) {
      res({ value });
    } else {
      res({ error: 'Not Negative' });
    }
  });
}

async function demo(input: number) {
  const result = await isNegative(input);
  if ('error' in result) {
    notifyUser(result.error);
    return;
  }
  save(result.value);
}