// @flow

import type {
  AttributeSelectorType,
  PropertySelectorType,
  QuantifierType
} from './types';
import {
  NotFoundError
} from './errors';

/**
 * @see https://www.regex101.com/r/k3IuC4/1
 */
const quantifierExpression = /\{(\d+?)(,?)(-?\d+)?\}(?:\[(\d+)\])?$/;

export const hasQuantifier = (selector: string): boolean => {
  return quantifierExpression.test(selector);
};

export const getQuantifier = (selector: string): QuantifierType => {
  const quantifier = selector.match(quantifierExpression);

  if (!quantifier) {
    throw new NotFoundError();
  }

  if (quantifier[2] === ',') {
    return {
      accessor: typeof quantifier[4] === 'undefined' ? null : Number(quantifier[4]),
      expression: quantifier[0],
      max: quantifier[3] ? Number(quantifier[3]) : Infinity,
      min: Number(quantifier[1])
    };
  } else {
    return {
      accessor: typeof quantifier[4] === 'undefined' ? null : Number(quantifier[4]),
      expression: quantifier[0],
      max: Number(quantifier[1]),
      min: Number(quantifier[1])
    };
  }
};

const propertySelectorExpression = /(@\.[a-z][a-z0-1-]+)$/i;

export const hasPropertySelector = (selector: string): boolean => {
  return propertySelectorExpression.test(selector);
};

export const getPropertySelector = (selector: string): PropertySelectorType => {
  const propertySelector = selector.match(propertySelectorExpression);

  if (!propertySelector) {
    throw new NotFoundError();
  }

  return {
    expression: propertySelector[0],
    propertyName: propertySelector[0].slice(2)
  };
};

/**
 * @see https://www.regex101.com/r/xiA8hy/1
 */
const attributeSelectorExpression = /(@[a-z][a-z0-1-]+)$/i;

export const hasAttributeSelector = (selector: string): boolean => {
  return attributeSelectorExpression.test(selector);
};

export const getAttributeSelector = (selector: string): AttributeSelectorType => {
  const attributeSelector = selector.match(attributeSelectorExpression);

  if (!attributeSelector) {
    throw new NotFoundError();
  }

  return {
    attributeName: attributeSelector[0].slice(1),
    expression: attributeSelector[0]
  };
};
