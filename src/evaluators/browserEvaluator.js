// @flow

import type {
  EvaluatorType
} from '../types';

export default (): EvaluatorType => {
  const getAttribute = (node: HTMLElement, name: string): string | null => {
    const attributeValue = node.getAttribute(name);

    if (typeof attributeValue === 'string') {
      return attributeValue;
    }

    return null;
  };

  const getProperty = (node: HTMLElement, name: string): mixed => {
    // $FlowFixMe
    return node[name];
  };

  const querySelectorAll = (node: HTMLElement, selector: string) => {
    return [].slice.apply(node.querySelectorAll(selector));
  };

  return {
    getAttribute,
    getProperty,
    querySelectorAll
  };
};
