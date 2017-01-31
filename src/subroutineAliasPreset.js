import {
  readSubroutine,
  selectSubroutine,
  testSubroutine
} from './subroutines';

export default {
  ra: (evaluator, subject, values) => {
    return readSubroutine(evaluator, subject, ['attribute'].concat(values));
  },
  rp: (evaluator, subject, values) => {
    return readSubroutine(evaluator, subject, ['property'].concat(values));
  },
  s: (evaluator, subject, values) => {
    return selectSubroutine(evaluator, subject, [values.join(' '), '{1}']);
  },
  sm: (evaluator, subject, values) => {
    return selectSubroutine(evaluator, subject, [values.join(' '), '{0,}']);
  },
  t: testSubroutine
};
