// @flow

import type {
  EvaluatorType
} from '../types';
import {
  ReadSubroutineNotFoundError
} from '../errors';

export default (): EvaluatorType => {
  const getAttributeValue = (node: HTMLElement, name: string): string => {
    const attributeValue = node.getAttribute(name);

    if (typeof attributeValue === 'string') {
      return attributeValue;
    }

    throw new ReadSubroutineNotFoundError();
  };

  const getPropertyValue = (node: HTMLElement, name: string): mixed => {
    // $FlowFixMe
    return node[name];
  };

  const parseDocument = (subject: string): HTMLElement => {
    const aux = document.createElement('div');

    aux.innerHTML = subject;

    return aux;
  };

  const querySelectorAll = (node: HTMLElement, selector: string): Array<HTMLElement> => {
    return [].slice.apply(node.querySelectorAll(selector));
  };

  return {
    getAttributeValue,
    getPropertyValue,
    parseDocument,
    querySelectorAll
  };
};
