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

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
   */
  const isElement = (maybeElement) => {
    return typeof maybeElement === 'object' && maybeElement !== null && maybeElement.nodeType === 1;
  };

  const parseDocument = (subject: string): HTMLElement => {
    const aux = document.createElement('div');

    aux.innerHTML = subject;

    return aux;
  };

  const querySelectorAll = (node: HTMLElement, selector: string): Array<HTMLElement> => {
    return [].slice.apply(node.querySelectorAll(selector));
  };

  const nextUntil = (node: HTMLElement, selector: string, filter?: string) => {
    throw new Error('Not implemented.');
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
