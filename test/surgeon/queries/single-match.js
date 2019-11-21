// @flow

import test from 'ava';
import surgeon, {
  SelectSubroutineUnexpectedResultCountError,
} from '../../../src';
import type {
  DenormalizedQueryType,
} from '../../../src/types';

test('extracts a single value (expression string)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = 'select .foo | read property textContent';

  t.true(x(query, subject) === 'bar');
});

test('short-circuits an expression if optional selector does not match anything', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = 'select .bar {0,1} | read property textContent';

  t.true(x(query, subject) === null);
});

test('extracts a single value (array of expressions)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo',
    'read property textContent',
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
    'read property textContent',
  ];

  t.true(x(query, subject) === 'bar');
});

test('throws error if no nodes are matched', (t): void => {
  const x = surgeon();

  const subject = '';

  const query: DenormalizedQueryType = [
    'select .foo',
  ];

  t.throws((): void => {
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
    'select .foo',
  ];

  t.throws((): void => {
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

test('extracts a single value (expression string [foo*="bar"])', (t): void => {
  const x = surgeon();

  const subject = `
    <div foo="barbaz">bar</div>
  `;

  // eslint-disable-next-line quotes
  const query: DenormalizedQueryType = `select '[foo*="bar"]' | read property textContent`;

  t.true(x(query, subject) === 'bar');
});

// @see https://github.com/fb55/css-select/issues/111
// eslint-disable-next-line ava/no-skip-test
test.skip('extracts a single value (expression string `.foo:has(+.bar)`)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">a</div>
    <div class="bar">b</div>
  `;

  // eslint-disable-next-line quotes
  const query: DenormalizedQueryType = `select '.foo:has(+.bar)' | read property textContent`;

  t.true(x(query, subject) === 'foo');
});

test('extracts a single value (using inline subroutine)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">FOO</div>
    <div class="bar">BAR</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo',
    (input) => {
      t.is(input.text(), 'FOO');

      return input.next();
    },
    'read property textContent',
  ];

  t.is(x(query, subject), 'BAR');
});
