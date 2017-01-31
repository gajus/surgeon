// @flow

import {
  SurgeonError
} from '../errors';
import {
  quantifierExpression
} from '../expressions';

type ParsedQuantifierExpressionType = {|
  max: number,
  min: number
|};

export default (selector: string): ParsedQuantifierExpressionType => {
  const quantifier = selector.match(quantifierExpression);

  if (!quantifier) {
    throw new SurgeonError('Invalid quantifier expression.');
  }

  if (quantifier[2] === ',') {
    return {
      max: quantifier[3] ? Number(quantifier[3]) : Infinity,
      min: Number(quantifier[1])
    };
  } else {
    return {
      max: Number(quantifier[1]),
      min: Number(quantifier[1])
    };
  }
};
