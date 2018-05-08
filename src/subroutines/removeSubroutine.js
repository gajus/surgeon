// @flow

import {
  FinalResultSentinel
} from 'pianola';
import {
  createDebug
} from '../utilities';
import type {
  SubroutineType
} from '../types';
import selectSubroutine from './selectSubroutine';

const debug = createDebug('subroutine:remove');

const removeSubroutine: SubroutineType = (inputSubject, [cssSelector, quantifierExpression], {evaluator}) => {
  debug('selecting "%s" for removal', cssSelector);

  // Ensure that we do not mutate the parent node.
  const subject = inputSubject.clone();

  const matches = selectSubroutine(subject, [cssSelector, quantifierExpression], {evaluator});

  if (Array.isArray(matches)) {
    for (const match of matches) {
      evaluator.remove(match);
    }
  } else if (!(matches instanceof FinalResultSentinel)) {
    evaluator.remove(matches);
  }

  return subject;
};

export default removeSubroutine;
