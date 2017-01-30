// @flow

import createDebug from 'debug';
import extractValue from './extractValue';
import type {
  EvaluatorType,
  QueryType
} from './types';
import {
  InvalidDataError,
  UnexpectedResultCountError
} from './errors';
import {
  InvalidValueSentinel
} from './sentinels';

const debug = createDebug('surgeon');

// eslint-disable-next-line flowtype/no-weak-types
const queryDocument = (evaluator: EvaluatorType, query: QueryType, subject: Object): mixed => {
  debug('selector "%s" ', query.select.selector);

  let matches;

  if (query.select.selector === '::self') {
    matches = [
      subject
    ];
  } else {
    matches = evaluator.querySelectorAll(subject, query.select.selector);
  }

  debug('matched %d node(s)', matches.length);

  if (matches.length < query.select.quantifier.min || matches.length > query.select.quantifier.max) {
    debug('expected to match between %d and %s matches', query.select.quantifier.min, query.select.quantifier.max === Infinity ? 'infinity' : query.select.quantifier.max);

    throw new UnexpectedResultCountError(matches.length, query.select.quantifier);
  }

  if (query.select.quantifier.multiple === false) {
    matches = matches.slice(0, 1);
  }

  const results = [];

  for (const match of matches) {
    let result;

    if (query.adopt) {
      result = {};

      const fieldNames = Object.keys(query.adopt);

      for (const fieldName of fieldNames) {
        result[fieldName] = queryDocument(evaluator, query.adopt[fieldName], match);
      }
    } else if (query.extract) {
      result = extractValue(evaluator, match, query.extract);
    }

    results.push(result);

    if (query.test) {
      const testResult = query.test(result);

      if (testResult instanceof InvalidValueSentinel) {
        throw new InvalidDataError(result, testResult);
      } else if (testResult === false) {
        throw new InvalidDataError(result, 'data does not pass the validation');
      }
    }
  }

  return query.select.quantifier.multiple ? results : results[0];
};

export default queryDocument;
