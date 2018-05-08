// @flow

import type {
  EvaluatorType
} from '../types';
import {
  ReadSubroutineNotFoundError
} from '../errors';

export default (): EvaluatorType => {
  const getAttributeValue = (node, name) => {
    const attributeValue = node.getAttribute(name);

    if (typeof attributeValue === 'string') {
      return attributeValue;
    }

    throw new ReadSubroutineNotFoundError();
  };

  const getPropertyValue = (node, name) => {
    // $FlowFixMe
    return node[name];
  };

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
   */
  const isElement = (maybeElement) => {
    return typeof maybeElement === 'object' && maybeElement !== null && maybeElement.nodeType === 1;
  };

  const parseDocument = (subject) => {
    const aux = document.createElement('div');

    aux.innerHTML = subject;

    return aux;
  };

  const querySelectorAll = (node, selector) => {
    return [].slice.apply(node.querySelectorAll(selector));
  };

  // eslint-disable-next-line no-unused-vars
  const nextUntil = (node, selector, filter) => {
    throw new Error('Unimplemented.');
  };

  // eslint-disable-next-line no-unused-vars
  const remove = (node) => {
    throw new Error('Unimplemented.');
  };

  return {
    getAttributeValue,
    getPropertyValue,
    isElement,
    nextUntil,
    parseDocument,
    querySelectorAll,
    remove
  };
};
