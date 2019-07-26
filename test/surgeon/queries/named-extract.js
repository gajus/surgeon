// @flow

import test from 'ava';
import surgeon from '../../../src';
import type {
  DenormalizedQueryType,
} from '../../../src/types';

test('extracts a single value', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="bar">baz</div>
    </div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {1}',
    {
      name: 'select .bar {1} | read property textContent',
    },
  ];

  t.deepEqual(x(query, subject), {
    name: 'baz',
  });
});

test('extracts multiple values', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = [
    'select .foo {0,}',
    {
      name: 'read property textContent',
    },
  ];

  const expectedResult = [
    {
      name: 'bar0',
    },
    {
      name: 'bar1',
    },
  ];

  t.deepEqual(x(query, subject), expectedResult);
});
