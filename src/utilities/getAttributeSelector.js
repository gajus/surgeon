// @flow

import type {
  AttributeSelectorType
} from '../types';
import {
  NotFoundError
} from '../errors';
import {
  attributeSelectorExpression
} from '../expressions';

export default (selector: string): AttributeSelectorType => {
  const attributeSelector = selector.match(attributeSelectorExpression);

  if (!attributeSelector) {
    throw new NotFoundError();
  }

  return {
    attributeName: attributeSelector[0].slice(1),
    expression: attributeSelector[0]
  };
};
