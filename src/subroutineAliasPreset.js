import {
  readSubroutine,
  selectSubroutine,
  testSubroutine
} from './subroutines';

export default {
  ra: (subject, values, bindle) => {
    return readSubroutine(subject, ['attribute'].concat(values), bindle);
  },
  rp: (subject, values, bindle) => {
    return readSubroutine(subject, ['property'].concat(values), bindle);
  },
  s: (subject, values, bindle) => {
    return selectSubroutine(subject, [values.join(' '), '{1}'], bindle);
  },
  sm: (subject, values, bindle) => {
    return selectSubroutine(subject, [values.join(' '), '{0,}'], bindle);
  },
  t: testSubroutine
};
