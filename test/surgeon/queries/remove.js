// @flow

import test from 'ava';
import {
  trim,
} from 'lodash';
import surgeon, {
  subroutineAliasPreset,
  SelectSubroutineUnexpectedResultCountError,
} from '../../../src';
import type {
  DenormalizedQueryType,
} from '../../../src/types';

test('removes a single element', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="bar"></div>
      <div class="baz"></div>
    </div>
  `;

  const query: DenormalizedQueryType = 'select .foo | remove .bar | read property innerHTML';

  t.is(trim(await x(query, subject)), '<div class="baz"></div>');
});

test('does not mutate the parent node', async (t) => {
  const x = surgeon({
    subroutines: {
      ...subroutineAliasPreset,
    },
  });

  const subject = `
    <a>
      <time>TIME<attributes>ATTRIBUTES</attributes></time>
    </a>
  `;

  // The order of properties is important.
  // `s time | rdtc` removes the descending nodes, including <attributes>.
  const query: DenormalizedQueryType = [
    'so a',
    {
      time: 'so time | rdtc',
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      attributes: 'so attributes | rdtc',
    },
  ];

  const result = await x(query, subject);

  t.deepEqual(result, {
    attributes: 'ATTRIBUTES',
    time: 'TIME',
  });
});

test('removes nothing if no nodes are matched {0,1}', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="baz"></div>
    </div>
  `;

  const query: DenormalizedQueryType = 'select .foo | remove .bar {0,1} | read property innerHTML';

  t.is(trim(await x(query, subject)), '<div class="baz"></div>');
});

test('removes multiple elements {0,}', async (t) => {
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

  t.is(trim(await x(query, subject)), '<div class="bar"></div>');
});

test('throws error if no nodes are matched', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="bar"></div>
      <div class="baz"></div>
    </div>
  `;

  const query: DenormalizedQueryType = 'select .foo | remove .qux | read property innerHTML';

  const error = await t.throwsAsync(x(query, subject));

  t.true(error instanceof SelectSubroutineUnexpectedResultCountError);
});

test('throws error if more than one node is matched', async (t) => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  `;

  const query: DenormalizedQueryType = 'select .foo | remove .bar | read property innerHTML';

  const error = await t.throwsAsync(x(query, subject));

  t.true(error instanceof SelectSubroutineUnexpectedResultCountError);
});
