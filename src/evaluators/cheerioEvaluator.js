// @flow

/* eslint-disable flowtype/no-weak-types */

import cheerio from 'cheerio';
import type {
  EvaluatorType
} from '../types';
import {
  ReadSubroutineNotFoundError
} from '../errors';

export default (): EvaluatorType => {
  const getAttributeValue = (node: Object, name: string): string => {
    const attributeValue = node.attr(name);

    if (typeof attributeValue === 'string') {
      return attributeValue;
    }

    throw new ReadSubroutineNotFoundError();
  };

  const getPropertyValue = (node: Object, name: string): mixed => {
    if (name === 'textContent') {
      return node.text();
    }

    // @see https://github.com/cheeriojs/cheerio/issues/944
    if (name === 'outerHTML') {
      return node.clone().wrap('<div>').parent().html();
    }

    // @see https://github.com/cheeriojs/cheerio/issues/1099
    if (name === 'innerHTML') {
      return node.html();
    }

    // @see https://github.com/cheeriojs/cheerio/issues/993
    if (name === 'childNodes') {
      return node[0].childNodes;
    }

    return node.prop(name);
  };

  /**
   * @see https://github.com/cheeriojs/cheerio/issues/765
   */
  const isElement = (maybeElement) => {
    return typeof maybeElement === 'object' && maybeElement !== null && typeof maybeElement.cheerio !== 'undefined';
  };

  const parseDocument = (subject: string): Object => {
    return cheerio.load(subject).root();
  };

  const querySelectorAll = (node: Object, selector: string): Array<Object> => {
    return node
      .find(selector)
      .toArray()
      .map((element) => {
        return cheerio(element);
      });
  };

  const nextUntil = (node: Object, selector: string, filter?: string): Array<Object> => {
    return node
      .nextUntil(selector, filter)
      .toArray()
      .map((element) => {
        return cheerio(element);
      });
  };

  return {
    getAttributeValue,
    getPropertyValue,
    isElement,
    nextUntil,
    parseDocument,
    querySelectorAll
  };
};
