// @flow

import {
  vsprintf
} from 'sprintf-js';
import {
  SurgeonError
} from '../errors';

const formatSubroutine = (subject: string, [sprintfFormat]: $ReadOnlyArray<string> = []) => {
  if (typeof subject !== 'string') {
    throw new SurgeonError('Input is not a string.');
  }

  return vsprintf(sprintfFormat || '%1$s', [
    subject
  ]);
};

export default formatSubroutine;
