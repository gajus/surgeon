// @flow

import {
  FinalResultSentinel
} from 'pianola';
import {
  createDebug
} from '../utilities';
import {
  parseQuantifierExpression
} from '../parsers';
import {
  SelectSubroutineUnexpectedResultCountError,
  SurgeonError
} from '../errors';
import type {
  SelectSubroutineQuantifierType,
  SubroutineType
} from '../types';

const debug = createDebug('subroutine:select');

const createQuantifier = (quantifierExpression?: string): SelectSubroutineQuantifierType => {
  let quantifier;

  if (quantifierExpression) {
    const quantifierTokens = parseQuantifierExpression(quantifierExpression);

    if (quantifierTokens.max === 1) {
      quantifier = {
        max: 1,
        min: 0,
        multiple: false
      };
    } else {
      quantifier = {
        max: typeof quantifierTokens.max === 'undefined' ? Infinity : quantifierTokens.max,
        min: typeof quantifierTokens.min === 'undefined' ? 0 : quantifierTokens.min,
        multiple: true
      };
    }
  } else {
    quantifier = {
      max: 1,
      min: 1,
      multiple: false
    };
  }

  return quantifier;
};

const selectSubroutine: SubroutineType = (subject, [cssSelector, quantifierExpression], {evaluator}) => {
  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  const matches = evaluator.querySelectorAll(subject, cssSelector);

  const quantifier = createQuantifier(quantifierExpression);

  debug('selector "%s" matched %d node(s)', cssSelector, matches.length);

  if (matches.length < quantifier.min || matches.length > quantifier.max) {
    debug('expected to match between %d and %s matches', quantifier.min, quantifier.max === Infinity ? 'infinity' : quantifier.max);

    throw new SelectSubroutineUnexpectedResultCountError(matches.length, quantifier);
  }

  if (quantifier.multiple === true) {
    return matches;
  } else {
    return matches[0] || new FinalResultSentinel(null);
  }
};

export default selectSubroutine;
