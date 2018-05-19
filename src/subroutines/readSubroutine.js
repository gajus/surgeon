// @flow

import {
  SurgeonError
} from '../errors';
import type {
  SubroutineType
} from '../types';
import Logger from '../Logger';

const log = Logger.child({
  namespace: 'subroutine:read'
});

const readSubroutine: SubroutineType = (subject, [target, name], {evaluator}) => {
  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  let value;

  if (target === 'attribute') {
    log.debug('reading attribute "%s"', name);

    value = evaluator.getAttributeValue(subject, name);
  } else if (target === 'property') {
    log.debug('reading property "%s"', name);

    value = evaluator.getPropertyValue(subject, name);
  } else {
    throw new SurgeonError('Unexpected read target.');
  }

  log.debug({
    value
  }, 'read value');

  return value;
};

export default readSubroutine;
