// @flow

import parseQuery from './parseQuery';
import readValue from './readValue';
import type {
  UserConfigurationType
} from './types';
import {
  InvalidDataError,
  NotFoundError,
  UnexpectedResultCountError
} from './errors';
import {
  createConfiguration
} from './factories';

export {
  InvalidDataError,
  NotFoundError,
  UnexpectedResultCountError
};

type ChildSelectorsType = {
  [key: string]: Function
};

export default (userConfiguration?: UserConfigurationType) => {
  const {
    evaluator
  } = createConfiguration(userConfiguration);

  const x = (query: string, ...args: any) => {
    let childSelectors: ChildSelectorsType;
    let validationRule: RegExp;

    if (args[0] instanceof RegExp) {
      validationRule = args[0];
    } else {
      childSelectors = args[0];
    }

    const {
      selector,
      quantifier,
      attributeSelector,
      propertySelector
    } = parseQuery(query);

    return (input: mixed) => {
      const rootElement = input;

      const matches = evaluator.querySelectorAll(rootElement, selector);

      const matchCount = matches.length;

      if (childSelectors) {
        return matches
          .map((element) => {
            const children = {};

            const childPropertyNames = Object.keys(childSelectors);

            for (const childPropertyName of childPropertyNames) {
              const value = childSelectors[childPropertyName];

              children[childPropertyName] = value(element);
            }

            return children;
          });
      }

      if (matchCount < quantifier.min || matchCount > quantifier.max) {
        throw new UnexpectedResultCountError(matchCount, quantifier);
      } else if (typeof quantifier.accessor === 'number') {
        return readValue(evaluator, matches[quantifier.accessor], attributeSelector, propertySelector, validationRule);
      } else {
        return matches
          .map((element) => {
            return readValue(evaluator, element, attributeSelector, propertySelector, validationRule);
          });
      }
    };
  };

  return x;
};
