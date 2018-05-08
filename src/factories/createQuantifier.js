// @flow

import {
  parseQuantifierExpression
} from '../parsers';
import type {
  SelectSubroutineQuantifierType
} from '../types';

export default (quantifierExpression?: string): SelectSubroutineQuantifierType => {
  let quantifier;

  if (quantifierExpression) {
    const quantifierTokens = parseQuantifierExpression(quantifierExpression);

    if (quantifierTokens.max === 1) {
      quantifier = {
        index: 0,
        max: 1,
        min: 0
      };
    } else {
      quantifier = {
        index: quantifierTokens.index,
        max: typeof quantifierTokens.max === 'undefined' ? Infinity : quantifierTokens.max,
        min: typeof quantifierTokens.min === 'undefined' ? 0 : quantifierTokens.min
      };
    }
  } else {
    quantifier = {
      index: 0,
      max: 1,
      min: 1
    };
  }

  return quantifier;
};
