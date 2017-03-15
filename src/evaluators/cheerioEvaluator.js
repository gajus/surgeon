// @flow

import cheerio from 'cheerio';
import type {
  EvaluatorType
} from '../types';
import {
  ReadSubroutineNotFoundError
} from '../errors';

export default (): EvaluatorType => {
  // eslint-disable-next-line flowtype/no-weak-types
  const getAttributeValue = (node: Object, name: string): string => {
    const attributeValue = node.attr(name);

    if (typeof attributeValue === 'string') {
      return attributeValue;
    }

    throw new ReadSubroutineNotFoundError();
  };

  // eslint-disable-next-line flowtype/no-weak-types
  const getPropertyValue = (node: Object, name: string): mixed => {
    if (name === 'textContent') {
      return node.text();
    }

    // @see https://github.com/cheeriojs/cheerio/issues/944
    if (name === 'outerHTML') {
      return node.clone().wrap('<div>').parent().html();
    }

    return node.prop(name);
  };

  /**
   * @see https://github.com/cheeriojs/cheerio/issues/765
   */
  const isElement = (maybeElement) => {
    return typeof maybeElement === 'object' && maybeElement !== null && typeof maybeElement.cheerio !== 'undefined';
  };

  // eslint-disable-next-line flowtype/no-weak-types
  const parseDocument = (subject: string): Object => {
    return cheerio.load(subject).root();
  };

  // eslint-disable-next-line flowtype/no-weak-types
  const querySelectorAll = (node: Object, selector: string): Array<Object> => {
    return node
      .find(selector)
      .toArray()
      .map((element) => {
        return cheerio(element);
      });
  };

  return {
    getAttributeValue,
    getPropertyValue,
    isElement,
    parseDocument,
    querySelectorAll
  };
};
