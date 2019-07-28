// @flow

import {
  SurgeonError,
} from '../errors';

const prependSubroutine = (subject: string, [head]: $ReadOnlyArray<string> = []) => {
  if (typeof subject !== 'string') {
    throw new SurgeonError('Input is not a string.');
  }

  return head + subject;
};

export default prependSubroutine;
