// @flow

import {
  SurgeonError
} from '../errors';
import type {
  ModifySubroutineType
} from '../types';

const modifySubroutine: ModifySubroutineType = (subject, [target, name, value], {evaluator}) => {
  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  if (target === 'attribute') {
    return evaluator.setAttributeValue(subject, name, value);
  } else if (target === 'property') {
    return evaluator.setPropertyValue(subject, name, value);
  } else {
    throw new SurgeonError('Unexpected modify target.');
  }
};

export default modifySubroutine;
