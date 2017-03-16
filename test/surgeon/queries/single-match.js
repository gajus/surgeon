// @flow

import test from 'ava';
import surgeon, {
  SelectSubroutineUnexpectedResultCountError
} from '../../../src';
import type {
  DenormalizedQueryType
} from '../../../src/types';

test('extracts a single value (expression string)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = 'select .foo | read property textContent';

  t.true(x(query, subject) === 'bar');
});

test('extracts a single value (array of expressions)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo',
    'read property textContent'
  ];

  t.true(x(query, subject) === 'bar');
});

test('extracts a single value (quantifier max 1)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {1}',
    'read property textContent'
  ];

  t.true(x(query, subject) === 'bar');
});

test('throws error if no nodes are matched', (t): void => {
  const x = surgeon();

  const subject = '';

  const query: DenormalizedQueryType = [
    'select .foo'
  ];

  t.throws(() => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});

test('throws error if more than one node is matched', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo'
  ];

  t.throws(() => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});

// @todo Test with both evaluators.
test('reads childNodes', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = 'select .foo | read property childNodes';

  t.true(x(query, subject)[0].nodeValue === 'bar');
});
