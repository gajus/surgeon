// @flow

import type {
  AttributeSelectorType,
  PropertySelectorType,
  QuantifierType
} from './types';
import {
  getAttributeSelector,
  getPropertySelector,
  getQuantifier,
  hasAttributeSelector,
  hasPropertySelector,
  hasQuantifier
} from './utilities';

type QueryType = {|
  +attributeSelector?: AttributeSelectorType,
  +propertySelector?: PropertySelectorType,
  +quantifier: QuantifierType,
  +selector: string
|};

export default (query: string): QueryType => {
  let selector;
  let quantifier: QuantifierType;
  let attributeSelector: AttributeSelectorType;
  let propertySelector: PropertySelectorType;

  if (hasQuantifier(query)) {
    quantifier = getQuantifier(query);

    if (!quantifier.expression) {
      throw new Error('Unexpected result.');
    }

    selector = query.slice(0, -1 * quantifier.expression.length);
  } else {
    quantifier = {
      accessor: 0,
      max: 1,
      min: 1
    };

    selector = query;
  }

  if (hasPropertySelector(selector)) {
    propertySelector = getPropertySelector(selector);

    selector = query.slice(0, -1 * propertySelector.expression.length);
  } else if (hasAttributeSelector(selector)) {
    attributeSelector = getAttributeSelector(selector);

    selector = query.slice(0, -1 * attributeSelector.expression.length);
  }

  return {
    attributeSelector,
    propertySelector,
    quantifier,
    selector
  };
};
