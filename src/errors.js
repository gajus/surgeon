// @flow

/* eslint-disable fp/no-class, flowtype/no-mixed */

import ExtendableError from 'es6-error';
import {
  InvalidValueSentinel,
} from './sentinels';
import type {
  SelectSubroutineQuantifierType,
} from './types';

export class SurgeonError extends ExtendableError {}

export class ReadSubroutineNotFoundError extends SurgeonError {}

export class SelectSubroutineUnexpectedResultCountError extends SurgeonError {
  // eslint-disable-next-line no-unused-vars
  constructor (matchCount: number, quantifier: SelectSubroutineQuantifierType) {
    super('Matched unexpected number of nodes.');
  }
}

export class InvalidDataError extends SurgeonError {
  constructor (value: mixed, error: InvalidValueSentinel) {
    super(error.message);
  }
}
