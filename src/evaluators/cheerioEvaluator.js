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

    return node.prop(name);
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
    parseDocument,
    querySelectorAll
  };
};
