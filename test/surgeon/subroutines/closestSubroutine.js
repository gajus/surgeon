// @flow

import test from 'ava';
import surgeon from '../../../src';
import type {
  DenormalizedQueryType
} from '../../../src/types';

test('returns the first matching preceeding node', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">wrong match 0</div>
    <div class="foo">wrong match 1</div>
    <div class="foo">foo</div>
    <div class="bar">bar</div>
    <div class="baz">baz</div>
    <div class="foo">wrong match 2</div>
  `;

  const query: DenormalizedQueryType = 'select .baz | closest .foo | read property textContent';

  t.true(x(query, subject) === 'foo');
});

test('returns the first matching node contained in a preceeding node', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">wrong match 0</div>
    <div class="foo">wrong match 1</div>
    <div class="bar">
      <div class="foo">foo</div>
    </div>
    <div class="baz">baz</div>
    <div class="foo">wrong match 2</div>
  `;

  const query: DenormalizedQueryType = 'select .baz | closest .foo | read property textContent';

  t.true(x(query, subject) === 'foo');
});

test('prioritizes preceeding node over a deep match', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">wrong match 0</div>
    <div class="foo">wrong match 1</div>
    <div class="bar">
      <div class="foo">wrong match 2</div>
    </div>
    <div class="foo">foo</div>
    <div class="baz">baz</div>
    <div class="foo">wrong match 3</div>
  `;

  const query: DenormalizedQueryType = 'select .baz | closest .foo | read property textContent';

  t.true(x(query, subject) === 'foo');
});

test('ascends the DOM tree', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">wrong match 0</div>
    <div class="foo">wrong match 1</div>
    <div class="foo">foo</div>
    <div>
      <div class="baz">baz</div>
    </div>
    <div class="foo">wrong match 3</div>
  `;

  const query: DenormalizedQueryType = 'select .baz | closest .foo | read property textContent';

  t.true(x(query, subject) === 'foo');
});

test('throws an error if node cannot be found', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="baz">baz</div>
  `;

  const query: DenormalizedQueryType = 'select .baz | closest .foo | read property textContent';

  t.throws(() => {
    x(query, subject);
  }, 'Cannot find a preceding node matching the provided CSS selector.');
});
