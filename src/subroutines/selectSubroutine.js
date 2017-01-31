// @flow

import createDebug from 'debug';
import {
  parseQuantifierExpression
} from '../parsers';
import {
  SelectSubroutineUnexpectedResultCountError
} from '../errors';
import type {
  SelectSubroutineQuantifierType,
  SubroutineType
} from '../types';

const debug = createDebug('surgeon:subroutine:select');

const selectSubroutine: SubroutineType = (evaluator, subject, [cssSelector, quantifierExpression]) => {
  // $FlowFixMe
  const matches = evaluator.querySelectorAll(subject, cssSelector);

  let quantifier: SelectSubroutineQuantifierType;

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

  debug('selector "%s" matched %d node(s)', cssSelector, matches.length);

  if (matches.length < quantifier.min || matches.length > quantifier.max) {
    debug('expected to match between %d and %s matches', quantifier.min, quantifier.max === Infinity ? 'infinity' : quantifier.max);

    throw new SelectSubroutineUnexpectedResultCountError(matches.length, quantifier);
  }

  return quantifier.multiple === true ? matches : matches[0];
};

export default selectSubroutine;
