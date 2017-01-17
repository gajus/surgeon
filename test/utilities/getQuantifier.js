// @flow

import test from 'ava';
import {
  NotFoundError
} from '../../src';
import getQuantifier from '../../src/utilities/getQuantifier';

test('returns the quantifier', (t): void => {
  t.deepEqual(getQuantifier('{1,1}'), {
    accessor: null,
    expression: '{1,1}',
    max: 1,
    min: 1
  });
  t.deepEqual(getQuantifier('{1,}'), {
    accessor: null,
    expression: '{1,}',
    max: Infinity,
    min: 1
  });
  t.deepEqual(getQuantifier('{0,1}'), {
    accessor: null,
    expression: '{0,1}',
    max: 1,
    min: 0
  });
  t.deepEqual(getQuantifier('{1}[0]'), {
    accessor: 0,
    expression: '{1}[0]',
    max: 1,
    min: 1
  });
  t.deepEqual(getQuantifier('{1,}[0]'), {
    accessor: 0,
    expression: '{1,}[0]',
    max: Infinity,
    min: 1
  });
  t.deepEqual(getQuantifier('{0,1}[0]'), {
    accessor: 0,
    expression: '{0,1}[0]',
    max: 1,
    min: 0
  });
});

test('throws an error if a quantifier is not present', (t): void => {
  t.throws(() => {
    getQuantifier('');
  }, NotFoundError);
});
