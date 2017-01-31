// @flow

import {
  SurgeonError
} from '../errors';
import type {
  SubroutineType
} from '../types';

const readSubroutine: SubroutineType = (evaluator, subject, [target, name]) => {
  if (target === 'attribute') {
    // $FlowFixMe
    return evaluator.getAttributeValue(subject, name);
  } else if (target === 'property') {
    // $FlowFixMe
    return evaluator.getPropertyValue(subject, name);
  } else {
    throw new SurgeonError('Unexpected read target.');
  }
};

export default readSubroutine;
