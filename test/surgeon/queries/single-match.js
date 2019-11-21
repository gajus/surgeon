// @flow

import test from 'ava';
import surgeon, {
  SelectSubroutineUnexpectedResultCountError,
} from '../../../src';
import type {
  DenormalizedQueryType,
} from '../../../src/types';

test('extracts a single value (expression string)', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = 'select .foo | read property textContent';

  t.is(await x(query, subject), 'bar');
});

test('short-circuits an expression if optional selector does not match anything', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = 'select .bar {0,1} | read property textContent';

  t.is(await x(query, subject), null);
});

test('extracts a single value (array of expressions)', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo',
    'read property textContent',
  ];

  t.is(await x(query, subject), 'bar');
});

test('extracts a single value (quantifier max 1)', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {1}',
    'read property textContent',
  ];

  t.is(await x(query, subject), 'bar');
});

test('throws error if no nodes are matched', async (t) => {
  const x = surgeon();

  const subject = '';

  const query: DenormalizedQueryType = [
    'select .foo',
  ];

  const error = await t.throwsAsync(x(query, subject));

  t.true(error instanceof SelectSubroutineUnexpectedResultCountError);
});

test('throws error if more than one node is matched', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo',
  ];

  const error = await t.throwsAsync(x(query, subject));

  t.true(error instanceof SelectSubroutineUnexpectedResultCountError);
});

// @todo Test with both evaluators.
test('reads childNodes', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = 'select .foo | read property childNodes';

  t.is((await x(query, subject))[0].nodeValue, 'bar');
});

test('extracts a single value (expression string [foo*="bar"])', async (t) => {
  const x = surgeon();

  const subject = `
    <div foo="barbaz">bar</div>
  `;

  // eslint-disable-next-line quotes
  const query: DenormalizedQueryType = `select '[foo*="bar"]' | read property textContent`;

  t.is(await x(query, subject), 'bar');
});

// @see https://github.com/fb55/css-select/issues/111
// eslint-disable-next-line ava/no-skip-test
test.skip('extracts a single value (expression string `.foo:has(+.bar)`)', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">a</div>
    <div class="bar">b</div>
  `;

  // eslint-disable-next-line quotes
  const query: DenormalizedQueryType = `select '.foo:has(+.bar)' | read property textContent`;

  t.is(await x(query, subject), 'foo');
});

test('extracts a single value (using inline subroutine)', async (t) => {
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

  t.is(await x(query, subject), 'BAR');
});
