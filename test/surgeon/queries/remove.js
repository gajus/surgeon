// @flow

import test from 'ava';
import {
  trim
} from 'lodash';
import surgeon, {
  SelectSubroutineUnexpectedResultCountError
} from '../../../src';
import type {
  DenormalizedQueryType
} from '../../../src/types';

test('removes a single element', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="bar"></div>
      <div class="baz"></div>
    </div>
  `;

  const query: DenormalizedQueryType = 'select .foo | remove .bar | read property innerHTML';

  t.true(trim(x(query, subject)) === '<div class="baz"></div>');
});

test('removes nothing if no nodes are matched {0,1}', (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="baz"></div>
    </div>
  `;

  const query: DenormalizedQueryType = 'select .foo | remove .bar {0,1} | read property innerHTML';

  t.true(trim(x(query, subject)) === '<div class="baz"></div>');
});

test('removes multiple elements {0,}', (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="bar"></div>
      <div class="baz"></div>
      <div class="baz"></div>
      <div class="baz"></div>
    </div>
  `;

  const query: DenormalizedQueryType = 'select .foo | remove .baz {0,} | read property innerHTML';

  t.true(trim(x(query, subject)) === '<div class="bar"></div>');
});

test('throws error if no nodes are matched', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="bar"></div>
      <div class="baz"></div>
    </div>
  `;

  const query: DenormalizedQueryType = 'select .foo | remove .qux | read property innerHTML';

  t.throws(() => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});

test('throws error if more than one node is matched', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  `;

  const query: DenormalizedQueryType = 'select .foo | remove .bar | read property innerHTML';

  t.throws(() => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});
