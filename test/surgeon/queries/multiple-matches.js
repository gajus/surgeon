// @flow

import test from 'ava';
import surgeon, {
  SelectSubroutineUnexpectedResultCountError
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

  const query: DenormalizedQueryType = [
    'select .foo {0,}',
    'read property textContent'
  ];

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

  const query: DenormalizedQueryType = [
    'select .foo {3,}'
  ];

  t.throws(() => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});

test('throws error if too many nodes are matched', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
    <div class="foo">bar2</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {0,2}'
  ];

  t.throws(() => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});
