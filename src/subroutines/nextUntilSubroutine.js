// @flow

import {
  SurgeonError
} from '../errors';
import type {
  SubroutineType
} from '../types';
import Logger from '../Logger';

const log = Logger.child({
  namespace: 'subroutine:nextUntil'
});

const nextUntilSubroutine: SubroutineType = (subject, [selectorExpression, filterExpression], {evaluator}) => {
  log.debug('selecting following siblings matching "%s" until "%s"', filterExpression, selectorExpression);

  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  const matches = evaluator.nextUntil(subject, selectorExpression, filterExpression);

  log.debug('matched %d node(s)', matches.length);

  return matches;
};

export default nextUntilSubroutine;
