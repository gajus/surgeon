// @flow

import type {
  AttributeSelectorType,
  EvaluatorType,
  PropertySelectorType
} from './types';
import {
  InvalidDataError,
  NotFoundError
} from './errors';

export default (evaluator: EvaluatorType, node: mixed, attributeSelector?: AttributeSelectorType, propertySelector?: PropertySelectorType, validationRule?: RegExp): mixed => {
  let returnValue;

  if (attributeSelector) {
    const attributeValue = evaluator.getAttribute(node, attributeSelector.attributeName);

    if (attributeValue === null) {
      throw new NotFoundError();
    }

    returnValue = attributeValue;
  } else if (propertySelector) {
    const propertyValue = evaluator.getProperty(node, propertySelector.propertyName);

    if (typeof propertyValue === 'undefined') {
      throw new NotFoundError();
    }

    returnValue = propertyValue;
  } else {
    const textContentPropertyValue = evaluator.getProperty(node, 'textContent');

    if (typeof textContentPropertyValue === 'undefined') {
      throw new NotFoundError();
    }

    returnValue = textContentPropertyValue;
  }

  if (validationRule) {
    if (!validationRule.test(returnValue)) {
      throw new InvalidDataError();
    }
  }

  return returnValue;
};
