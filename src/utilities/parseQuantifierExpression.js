// @flow

import {
  NotFoundError
} from '../errors';
import {
  quantifierExpression
} from '../expressions';

type ParsedQuantifierExpressionTokensType = {|
  expression: string,
  max: number,
  min: number
|};

export default (selector: string): ParsedQuantifierExpressionTokensType => {
  const quantifier = selector.match(quantifierExpression);

  if (!quantifier) {
    throw new NotFoundError();
  }

  if (quantifier[2] === ',') {
    return {
      expression: quantifier[0],
      max: quantifier[3] ? Number(quantifier[3]) : Infinity,
      min: Number(quantifier[1])
    };
  } else {
    return {
      expression: quantifier[0],
      max: Number(quantifier[1]),
      min: Number(quantifier[1])
    };
  }
};
