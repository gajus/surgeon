// @flow

import cheerio from 'cheerio';
import type {
  EvaluatorType
} from '../types';
import {
  ReadSubroutineNotFoundError
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
    if (name === 'href') {
      // URLs might include spaces, which a brower would encode when
      // the attribute value is retrieved through a DOM property.
      return encodeURI(node.attr('href'));
    }

    if (name === 'src') {
      // URLs might include spaces, which a brower would encode when
      // the attribute value is retrieved through a DOM property.
      return encodeURI(node.attr('src'));
    }

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

  const previous = (node, selector) => {
    return node.prev(selector);
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
    remove
  };
};
