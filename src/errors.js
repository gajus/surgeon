// @flow

import ExtendableError from 'es6-error';
import createDebug from 'debug';
import type {
  QuantifierType
} from './types';

const debug = createDebug('surgeon:errors');

export class NotFoundError extends ExtendableError {}

export class UnexpectedResultCountError extends ExtendableError {
  constructor (matchCount: number, quantifier: QuantifierType) {
    debug('Matched %d. Expected to match %s.', matchCount, quantifier.expression || '{1}[0]');

    super('Matched unexpected number of nodes.');
  }
}

export class InvalidDataError extends ExtendableError {}
