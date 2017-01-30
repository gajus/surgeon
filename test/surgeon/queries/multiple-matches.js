// @flow

import test from 'ava';
import surgeon, {
  UnexpectedResultCountError
} from '../../../src';
import type {
  DenormalizedQueryType
} from '../../../src/types';

test('extracts multiple values', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = {
    select: {
      quantifier: {
        max: Infinity,
        min: 0
      },
      selector: '.foo'
    }
  };

  t.deepEqual(x(query, subject), [
    'bar0',
    'bar1'
  ]);
});

test('throws error if too few nodes are matched', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = {
    select: {
      quantifier: {
        max: Infinity,
        min: 3
      },
      selector: '.foo'
    }
  };

  t.throws(() => {
    x(query, subject);
  }, UnexpectedResultCountError);
});

test('throws error if too many nodes are matched', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = {
    select: {
      quantifier: {
        max: 1,
        min: 0
      },
      selector: '.foo'
    }
  };

  t.throws(() => {
    x(query, subject);
  }, UnexpectedResultCountError);
});
