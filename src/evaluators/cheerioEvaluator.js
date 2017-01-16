// @flow

import cheerio from 'cheerio';
import type {
  EvaluatorType
} from '../types';

export default (): EvaluatorType => {
  const getAttribute = (node: Object, name: string): string | null => {
    const attributeValue = cheerio(node).attr(name);

    if (typeof attributeValue === 'string') {
      return attributeValue;
    }

    return null;
  };

  const getProperty = (node: Object, name: string): mixed => {
    const test = cheerio(node);

    if (name === 'textContent') {
      return test.text();
    }

    return test.prop(name);
  };

  const querySelectorAll = (node: string | Object, selector: string) => {
    return cheerio(selector, node).toArray();
  };

  return {
    getAttribute,
    getProperty,
    querySelectorAll
  };
};
