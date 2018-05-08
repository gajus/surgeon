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
import {
  SurgeonError
} from '../errors';
import selectSubroutine from './selectSubroutine';

const debug = createDebug('subroutine:remove');

const removeSubroutine: SubroutineType = (subject, [cssSelector, quantifierExpression], {evaluator}) => {
  debug('selecting "%s" for removal', cssSelector);

  if (!evaluator.isElement(subject)) {
    throw new SurgeonError('Unexpected value. Value must be an element.');
  }

  // Ensure that we do not mutate the parent node.
  const cloneSubject = evaluator.clone(subject);

  const matches = selectSubroutine(cloneSubject, [cssSelector, quantifierExpression], {evaluator});

  if (Array.isArray(matches)) {
    for (const match of matches) {
      evaluator.remove(match);
    }
  } else if (!(matches instanceof FinalResultSentinel)) {
    evaluator.remove(matches);
  }

  return cloneSubject;
};

export default removeSubroutine;
