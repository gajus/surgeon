// @flow

import test from 'ava';
import surgeon, {
  SelectSubroutineUnexpectedResultCountError,
} from '../../../src';
import type {
  DenormalizedQueryType,
} from '../../../src/types';

test('extracts multiple values', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {0,}',
    'read property textContent',
  ];

  t.deepEqual(x(query, subject), [
    'bar0',
    'bar1',
  ]);
});

test('extracts multiple nodes nextUntil', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">foo0</div>
    <div class="bar">bar0</div>
    <div class="bar">bar1</div>
    <div class="bar">bar2</div>
    <div class="foo">foo1</div>
    <div class="bar">bar3</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {0,}[0]',
    'nextUntil .foo',
    'read property textContent',
  ];

  t.deepEqual(x(query, subject), [
    'bar0',
    'bar1',
    'bar2',
  ]);
});

// @see https://github.com/cheeriojs/cheerio/issues/1194

// eslint-disable-next-line ava/no-skip-test
test.skip('extracts multiple nodes nextUntil (with filter)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">foo0</div>
    <div class="bar">bar0</div>
    <div class="bar">bar1</div>
    <div class="bar">bar2</div>
    <div class="foo">foo1</div>
    <div class="bar">bar3</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {0,}[0]',
    'nextUntil ".foo" ":not(:nth-child(4))"',
    'read property textContent',
  ];

  t.deepEqual(x(query, subject), [
    'bar0',
    'bar1',
  ]);
});

test('throws error if too few nodes are matched', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {3,}',
  ];

  const error = t.throws((): void => {
    x(query, subject);
  });

  t.true(error instanceof SelectSubroutineUnexpectedResultCountError);
});

test('throws error if too many nodes are matched', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
    <div class="foo">bar2</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {0,2}',
  ];

  const error = t.throws((): void => {
    x(query, subject);
  });

  t.true(error instanceof SelectSubroutineUnexpectedResultCountError);
});
