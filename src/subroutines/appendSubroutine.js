// @flow

import {
  SurgeonError,
} from '../errors';

const appendSubroutine = (subject: string, [tail]: $ReadOnlyArray<string> = []) => {
  if (typeof subject !== 'string') {
    throw new SurgeonError('Input is not a string.');
  }

  return subject + tail;
};

export default appendSubroutine;
