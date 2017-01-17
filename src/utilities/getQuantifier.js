// @flow

import type {
  QuantifierType
} from '../types';
import {
  NotFoundError
} from '../errors';
import {
  quantifierExpression
} from '../expressions';

export default (selector: string): QuantifierType => {
  const quantifier = selector.match(quantifierExpression);

  if (!quantifier) {
    throw new NotFoundError();
  }

  if (quantifier[2] === ',') {
    return {
      accessor: typeof quantifier[4] === 'undefined' ? null : Number(quantifier[4]),
      expression: quantifier[0],
      max: quantifier[3] ? Number(quantifier[3]) : Infinity,
      min: Number(quantifier[1])
    };
  } else {
    return {
      accessor: typeof quantifier[4] === 'undefined' ? null : Number(quantifier[4]),
      expression: quantifier[0],
      max: Number(quantifier[1]),
      min: Number(quantifier[1])
    };
  }
};
