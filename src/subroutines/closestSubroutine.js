// @flow

import cheerio from 'cheerio';
import {
  SurgeonError,
} from '../errors';
import type {
  SubroutineType,
} from '../types';
import Logger from '../Logger';

const log = Logger.child({
  namespace: 'subroutine:closest',
});

// eslint-disable-next-line flowtype/no-weak-types
const closestSubroutine: SubroutineType = (subject: any, [cssSelector], {evaluator}) => {
  log.debug('selecting "%s"', cssSelector);

  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  let parentElement = subject;

  while (true) {
    const previousNodes = parentElement
      .prevAll()
      .toArray()
      .map((previousNode) => {
        return cheerio(previousNode);
      });

    for (const previousNode of previousNodes) {
      const directMatch = previousNode.filter(cssSelector);

      if (directMatch.length) {
        return directMatch.last();
      }

      const deepMatches = previousNode.find(cssSelector);

      if (deepMatches.length) {
        return deepMatches.last();
      }
    }

    const maybeNextParentElement = parentElement.parent();

    if (!maybeNextParentElement || maybeNextParentElement[0] === parentElement[0]) {
      break;
    }

    parentElement = maybeNextParentElement;
  }

  throw new SurgeonError('Cannot find a preceding node matching the provided CSS selector.');
};

export default closestSubroutine;
