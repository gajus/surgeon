// @flow

import test from 'ava';
import surgeon, {
  UnexpectedResultCountError
} from '../../../src';
import type {
  DenormalizedQueryType
} from '../../../src/types';

test('extracts a single value (implicit select action)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = '.foo';

  t.true(x(query, subject) === 'bar');
});

test('extracts a single value', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = {
    select: '.foo'
  };

  t.true(x(query, subject) === 'bar');
});

test('extracts a single value (quantifier max 1)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = {
    select: {
      quantifier: {
        max: 1
      },
      selector: '.foo'
    }
  };

  t.true(x(query, subject) === 'bar');
});

test('throws error if no nodes are matched', (t): void => {
  const x = surgeon();

  const subject = '';

  const query: DenormalizedQueryType = {
    select: '.foo'
  };

  t.throws(() => {
    x(query, subject);
  }, UnexpectedResultCountError);
});

test('throws error if more than one node is matched', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = {
    select: '.foo'
  };

  t.throws(() => {
    x(query, subject);
  }, UnexpectedResultCountError);
});
