// @flow

import {
  createDebug
} from '../utilities';
import {
  SurgeonError
} from '../errors';
import type {
  SubroutineType
} from '../types';

const debug = createDebug('subroutine:read');

const readSubroutine: SubroutineType = (subject, [target, name], {evaluator}) => {
  debug('reading property "%s"', name);

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
