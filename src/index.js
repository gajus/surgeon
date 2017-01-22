// @flow

import cheerio from 'cheerio';
import createDebug from 'debug';
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

const SelectorParser = require('css-selector-parser').CssSelectorParser;

const selectorParser = new SelectorParser();

console.log('A', selectorParser.parse('.test:has(".foo")').rule );

export {
  InvalidDataError,
  NotFoundError,
  UnexpectedResultCountError
};

const debug = createDebug('surgeon');

export default (userConfiguration?: UserConfigurationType) => {
  const {
    evaluator
  } = createConfiguration(userConfiguration);

  const iterateChildNodes = (parentNode: mixed, schemas: Object) => {
    const properties = {};
    const propertyNames = Object.keys(schemas);

    for (const propertyName of propertyNames) {
      // eslint-disable-next-line no-use-before-define
      properties[propertyName] = x(parentNode, schemas[propertyName]);
    }

    return properties;
  };

  const filter = (elements: Array<Object>, condition: Object) => {
    return elements.filter((element) => {
      if (typeof condition.has === 'string') {
        try {
          // eslint-disable-next-line no-use-before-define
          x(element, {
            selector: condition.has
          });

          return true;
        } catch (error) {
          if (error instanceof UnexpectedResultCountError) {
            return false;
          }

          throw error;
        }
      }

      throw new Error('Invalid filter expression.');
    });
  };

  const x = (element: mixed, userSelectorSchema: string | Object) => {
    let selectorSchema: Object;

    if (typeof userSelectorSchema === 'string') {
      selectorSchema = {
        selector: userSelectorSchema
      };
    } else {
      selectorSchema = userSelectorSchema;
    }

    debug('selector "%s"', selectorSchema.selector);

    const {
      selector,
      quantifier,
      attributeSelector,
      propertySelector
    } = parseQuery(selectorSchema.selector);

    let matches;

    matches = evaluator.querySelectorAll(element, selector);

    if (selectorSchema.filter) {
      matches = filter(matches, selectorSchema.filter);
    }

    if (matches.length < quantifier.min || matches.length > quantifier.max) {
      throw new UnexpectedResultCountError(matches.length, quantifier);
    }

    if (typeof quantifier.accessor === 'number') {
      if (selectorSchema.properties) {
        return iterateChildNodes(matches[quantifier.accessor], selectorSchema.properties);
      }

      return readValue(evaluator, matches[quantifier.accessor], attributeSelector, propertySelector);
    }

    return matches
      .map((childNode) => {
        if (selectorSchema.properties) {
          return iterateChildNodes(childNode, selectorSchema.properties);
        }

        return readValue(evaluator, childNode, attributeSelector, propertySelector);
      });
  };

  return x;
};
