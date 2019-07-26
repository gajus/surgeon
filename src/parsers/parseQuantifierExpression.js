// @flow

import {
  SurgeonError,
} from '../errors';
import {
  quantifierExpression,
} from '../expressions';

type ParsedQuantifierExpressionType = {|
  +index: number | null,
  +max: number,
  +min: number
|};

export default (selector: string): ParsedQuantifierExpressionType => {
  const quantifier = selector.match(quantifierExpression);

  if (!quantifier) {
    throw new SurgeonError('Invalid quantifier expression.');
  }

  if (quantifier[2] === ',') {
    return {
      index: quantifier[4] ? Number(quantifier[4]) : null,
      max: quantifier[3] ? Number(quantifier[3]) : Infinity,
      min: Number(quantifier[1]),
    };
  } else {
    return {
      index: quantifier[2] ? Number(quantifier[2]) : null,
      max: Number(quantifier[1]),
      min: Number(quantifier[1]),
    };
  }
};
