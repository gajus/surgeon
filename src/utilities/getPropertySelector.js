// @flow

import type {
  PropertySelectorType
} from '../types';
import {
  NotFoundError
} from '../errors';
import {
  propertySelectorExpression
} from '../expressions';

export default (selector: string): PropertySelectorType => {
  const propertySelector = selector.match(propertySelectorExpression);

  if (!propertySelector) {
    throw new NotFoundError();
  }

  return {
    expression: propertySelector[0],
    propertyName: propertySelector[0].slice(2)
  };
};
