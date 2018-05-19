// @flow

import {
  FinalResultSentinel
} from 'pianola';
import {
  createQuantifier
} from '../factories';
import {
  SelectSubroutineUnexpectedResultCountError,
  SurgeonError
} from '../errors';
import type {
  SubroutineType
} from '../types';
import Logger from '../Logger';

const log = Logger.child({
  namespace: 'subroutine:select'
});

const selectSubroutine: SubroutineType = (subject, [cssSelector, quantifierExpression], {evaluator}) => {
  log.debug('selecting "%s"', cssSelector);

  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  const matches = evaluator.querySelectorAll(subject, cssSelector);

  const quantifier = createQuantifier(quantifierExpression);

  log.debug('selector "%s" matched %d node(s)', cssSelector, matches.length);

  if (matches.length < quantifier.min || matches.length > quantifier.max) {
    log.debug('expected to match between %d and %s matches', quantifier.min, quantifier.max === Infinity ? 'infinity' : quantifier.max);

    throw new SelectSubroutineUnexpectedResultCountError(matches.length, quantifier);
  }

  if (quantifier.index === null) {
    return matches;
  } else {
    return matches[quantifier.index] || new FinalResultSentinel(null);
  }
};

export default selectSubroutine;
