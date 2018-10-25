// @flow

import {
  SurgeonError
} from '../errors';
import type {
  ModifySubroutineType
} from '../types';
import Logger from '../Logger';

const log = Logger.child({
  namespace: 'subroutine:select'
});

const modifySubroutine: ModifySubroutineType = (subject, [selector, target, name, value], {evaluator}) => {
  log.debug('arguments "%s"', JSON.stringify({
    selector,
    target,
    name, // eslint-disable-line sort-keys
    value
  }, null, 4));

  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  // Function overloading
  if (typeof value === 'undefined') {
    /* eslint-disable no-param-reassign*/
    value = name;
    name = target;
    target = selector;
    selector = undefined;
    /* eslint-enable no-param-reassign*/
  }

  log.debug('overloaded arguments "%s"', JSON.stringify({
    selector,
    target,
    name, // eslint-disable-line sort-keys
    value
  }, null, 4));

  if (!(target === 'attribute' || target === 'property')) {
    throw new SurgeonError('Unexpected modify target.');
  }

  if (selector) {
    evaluator.querySelectorAll(subject, selector).forEach((match) => {
      if (target === 'attribute') {
        return evaluator.setAttributeValue(match, name, value);
      }

      return evaluator.setPropertyValue(match, name, value);
    });

    return subject;
  }

  if (target === 'attribute') {
    return evaluator.setAttributeValue(subject, name, value);
  }

  return evaluator.setPropertyValue(subject, name, value);
};

export default modifySubroutine;
