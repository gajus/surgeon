// @flow

import type {
  EvaluatorType
} from '../types';
import {
  NotFoundError
} from '../errors';

export default (): EvaluatorType => {
  const getAttributeValue = (node: HTMLElement, name: string): string => {
    const attributeValue = node.getAttribute(name);

    if (typeof attributeValue === 'string') {
      return attributeValue;
    }

    throw new NotFoundError();
  };

  const getPropertyValue = (node: HTMLElement, name: string): mixed => {
    // $FlowFixMe
    return node[name];
  };

  const querySelectorAll = (node: HTMLElement, selector: string): Array<HTMLElement> => {
    return [].slice.apply(node.querySelectorAll(selector));
  };

  return {
    getAttributeValue,
    getPropertyValue,
    querySelectorAll
  };
};
