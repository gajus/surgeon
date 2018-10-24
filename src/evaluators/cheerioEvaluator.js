// @flow

import cheerio from 'cheerio';
import type {
  EvaluatorType
} from '../types';
import {
  ReadSubroutineNotFoundError,
  SurgeonError
} from '../errors';

export default (): EvaluatorType => {
  const getAttributeValue = (node, name) => {
    const attributeValue = node.attr(name);

    if (typeof attributeValue === 'string') {
      return attributeValue;
    }

    throw new ReadSubroutineNotFoundError();
  };

  const getPropertyValue = (node, name) => {
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

  const parseDocument = (subject) => {
    return cheerio
      .load(subject, {
        xmlMode: false
      })
      .root();
  };

  const previous = (node) => {
    return node.prev();
  };

  const querySelectorAll = (node, selector) => {
    return node
      .find(selector)
      .toArray()
      .map((element) => {
        return cheerio(element);
      });
  };

  const nextUntil = (node, selector, filter) => {
    return node
      .nextUntil(selector, filter)
      .toArray()
      .map((element) => {
        return cheerio(element);
      });
  };

  const remove = (node) => {
    node.remove();
  };

  const setAttributeValue = (node, name, value) => {
    const modifiedNode = node.attr(name, value);

    if (!modifiedNode) {
      throw new SurgeonError('Something went wrong when trying to set attribute with name:' + name + ' to value:' + JSON.stringify(value, null, 4));
    }

    return modifiedNode;
  };

  const setPropertyValue = (node, name, value) => {
    const modifiedNode = node.prop(name, value);

    if (!modifiedNode) {
      throw new SurgeonError('Something went wrong when trying to set property with name:' + name + ' to value:' + JSON.stringify(value, null, 4));
    }

    return modifiedNode;
  };

  const clone = (node) => {
    return node.clone();
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
    setAttributeValue,
    setPropertyValue
  };
};
