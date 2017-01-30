// @flow

import {
  createAdoptAction,
  createSelectAction,
  createTestAction
} from '../factories';
import type {
  CreateQueryFactoryConfigurationType,
  DenormalizedQueryType,
  QueryType
} from '../types';
import tokenizeSelector from '../tokenizeSelector';

export type CreateQueryType = (denormalizedQuery: DenormalizedQueryType, configuration?: CreateQueryFactoryConfigurationType) => QueryType;

const isExctractQuery = (denormalizedQuery: DenormalizedQueryType): boolean => {
  return !denormalizedQuery.hasOwnProperty('adopt');
};

const createQuery: CreateQueryType = (denormalizedQuery, configuration) => {
  if (typeof denormalizedQuery === 'string') {
    // eslint-disable-next-line no-param-reassign
    denormalizedQuery = {
      select: denormalizedQuery
    };
  }

  if (!configuration) {
    // eslint-disable-next-line no-param-reassign
    configuration = {
      subroutines: {
        test: {}
      }
    };
  }

  if (typeof denormalizedQuery.select === 'string') {
    const {
      cssSelector,
      extract,
      test,
      quantifier
    } = tokenizeSelector(denormalizedQuery.select);

    // $FlowFixMe
    denormalizedQuery.select = {
      quantifier,
      selector: cssSelector
    };

    if (extract) {
      // $FlowFixMe
      denormalizedQuery.extract = extract;
    }

    if (test) {
      // $FlowFixMe
      denormalizedQuery.test = test;
    }
  }

  const select = createSelectAction(denormalizedQuery.select);

  if (isExctractQuery(denormalizedQuery)) {
    let extract = denormalizedQuery.extract || null;

    if (!extract) {
      extract = {
        name: 'textContent',
        type: 'property'
      };
    }

    const test = denormalizedQuery.test || null;

    if (test) {
      const testSubroutine = createTestAction(test, configuration.subroutines.test || {});

      return {
        extract,
        select,
        test: testSubroutine
      };
    }

    return {
      extract,
      select
    };
  }

  if (!denormalizedQuery.adopt) {
    throw new Error('Invalid query.');
  }

  const adopt = createAdoptAction(denormalizedQuery.adopt, createQuery, configuration);

  return {
    adopt,
    select
  };
};

export default createQuery;
