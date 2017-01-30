// @flow

import ExtendableError from 'es6-error';
import type {
  SelectActionQueryQuantifierType
} from './types';

export class SurgeonError extends ExtendableError {}

export class NotFoundError extends SurgeonError {}

export class UnexpectedResultCountError extends SurgeonError {
  // eslint-disable-next-line no-unused-vars
  constructor (matchCount: number, quantifier: SelectActionQueryQuantifierType) {
    super('Matched unexpected number of nodes.');
  }
}

export class InvalidDataError extends SurgeonError {}
