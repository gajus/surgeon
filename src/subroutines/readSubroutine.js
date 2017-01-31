// @flow

import {
  SurgeonError
} from '../errors';
import type {
  SubroutineType
} from '../types';

const readSubroutine: SubroutineType = (subject, [target, name], {evaluator}) => {
  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  if (target === 'attribute') {
    return evaluator.getAttributeValue(subject, name);
  } else if (target === 'property') {
    return evaluator.getPropertyValue(subject, name);
  } else {
    throw new SurgeonError('Unexpected read target.');
  }
};

export default readSubroutine;
