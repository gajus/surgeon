// @flow

import cheerio from 'cheerio';
import queryDocument from './queryDocument';
import type {
  DenormalizedQueryType,
  UserConfigurationType
} from './types';
import {
  InvalidDataError,
  NotFoundError,
  UnexpectedResultCountError
} from './errors';
import {
  createConfiguration,
  createQuery
} from './factories';
import {
  InvalidValueSentinel
} from './sentinels';
import {
  assertValidDenormalizedQuery
} from './assertions';
import {
  browserEvaluator,
  cheerioEvaluator
} from './evaluators';

export {
  browserEvaluator,
  cheerioEvaluator,
  InvalidDataError,
  InvalidValueSentinel,
  NotFoundError,
  UnexpectedResultCountError
};

export default (userConfiguration?: UserConfigurationType) => {
  const {
    evaluator,
    subroutines
  } = createConfiguration(userConfiguration);

  return (denormalizedQuery: DenormalizedQueryType, subject: string) => {
    assertValidDenormalizedQuery(denormalizedQuery);

    const query = createQuery(denormalizedQuery, {
      subroutines
    });

    // @todo Remove cheerio specific initialization.
    return queryDocument(evaluator, query, cheerio.load(subject).root());
  };
};
