// @flow

import type {
  EvaluatorType,
} from '../types';
import {
  ReadSubroutineNotFoundError,
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

  const previous = () => {
    throw new Error('Unimplemented.');
  };

  const querySelectorAll = (node, selector) => {
    return [].slice.apply(node.querySelectorAll(selector));
  };

  const nextUntil = () => {
    throw new Error('Unimplemented.');
  };

  const remove = () => {
    throw new Error('Unimplemented.');
  };

  const clone = () => {
    throw new Error('Unimplemented.');
  };

  return {
    clone,
    getAttributeValue,
    getPropertyValue,
    isElement,
    nextUntil,
    parseDocument,
    previous,
    querySelectorAll,
    remove,
  };
};
