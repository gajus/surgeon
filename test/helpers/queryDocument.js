// @flow

import cheerio from 'cheerio';
import type {
  QueryType
} from '../../src/types';
import queryDocument from '../../src/queryDocument';
import cheerioEvaluator from '../../src/evaluators/cheerioEvaluator';

// eslint-disable-next-line flowtype/no-weak-types
export default (query: QueryType, subject: Object): mixed => {
  const evaluator = cheerioEvaluator();

  return queryDocument(evaluator, query, cheerio.load(subject).root());
};
