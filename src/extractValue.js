// @flow

import type {
  EvaluatorType,
  ExtractActionQueryType
} from './types';

// eslint-disable-next-line flowtype/no-weak-types
export default (evaluator: EvaluatorType, subject: Object, extractAction: ExtractActionQueryType) => {
  if (extractAction.type === 'attribute') {
    return evaluator.getAttributeValue(subject, extractAction.name);
  } else if (extractAction.type === 'property') {
    return evaluator.getPropertyValue(subject, extractAction.name);
  } else {
    throw new Error('Unexpected extract type.');
  }
};
