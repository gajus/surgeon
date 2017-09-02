// @flow

import {
  createDebug
} from '../utilities';
import {
  SurgeonError
} from '../errors';
import type {
  SubroutineType
} from '../types';

const debug = createDebug('subroutine:nextUntil');

const nextUntilSubroutine: SubroutineType = (subject, [selectorExpression, filterExpression], {evaluator}) => {
  debug('selecting following siblings matching "%s" until "%s"', filterExpression, selectorExpression);

  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  const matches = evaluator.nextUntil(subject, selectorExpression, filterExpression);

  debug('matched %d node(s)', matches.length);

  return matches;
};

export default nextUntilSubroutine;
