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
  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  let value;

  if (target === 'attribute') {
    debug('reading attribute "%s"', name);

    value = evaluator.getAttributeValue(subject, name);
  } else if (target === 'property') {
    debug('reading property "%s"', name);

    value = evaluator.getPropertyValue(subject, name);
  } else {
    throw new SurgeonError('Unexpected read target.');
  }

  debug('read value', value);

  return value;
};

export default readSubroutine;
