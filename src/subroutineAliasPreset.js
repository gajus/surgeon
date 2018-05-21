import {
  nextUntilSubroutine,
  readSubroutine,
  removeSubroutine,
  selectSubroutine,
  testSubroutine
} from './subroutines';

export default {
  nu: (subject, values, bindle) => {
    return nextUntilSubroutine(subject, values, bindle);
  },
  ra: (subject, values, bindle) => {
    return readSubroutine(subject, ['attribute'].concat(values), bindle);
  },
  rdtc: (subject, values, bindle) => {
    return readSubroutine(removeSubroutine(subject, ['*', '{0,}'], bindle), ['property', 'textContent'], bindle);
  },
  rih: (subject, values, bindle) => {
    return readSubroutine(subject, ['property', 'innerHTML'], bindle);
  },
  roh: (subject, values, bindle) => {
    return readSubroutine(subject, ['property', 'outerHTML'], bindle);
  },
  rp: (subject, values, bindle) => {
    return readSubroutine(subject, ['property'].concat(values), bindle);
  },
  rtc: (subject, values, bindle) => {
    return readSubroutine(subject, ['property', 'textContent'], bindle);
  },
  sa: (subject, values, bindle) => {
    return selectSubroutine(subject, [values.join(' '), '{0,}'], bindle);
  },
  sm: (subject, values, bindle) => {
    return selectSubroutine(subject, [values.join(' '), '{1,}'], bindle);
  },
  so: (subject, values, bindle) => {
    return selectSubroutine(subject, [values.join(' '), '{1}'], bindle);
  },
  t: testSubroutine
};
