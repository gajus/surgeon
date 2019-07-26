// @flow

import {
  SurgeonError,
} from '../errors';
import type {
  SubroutineType,
} from '../types';

const previousSubroutine: SubroutineType = (subject, parameters, {evaluator}) => {
  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  return evaluator.previous(subject);
};

export default previousSubroutine;
