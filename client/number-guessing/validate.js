import { min, max } from './config';

export function validate (val) {
  if (!/^\d+$/.test(val)) {
    return 'ERR_MUST_GUESS_NUMBER';
  }

  if (val > max || val < min) {
    return 'ERR_RANGE';
  }

  return;
}
