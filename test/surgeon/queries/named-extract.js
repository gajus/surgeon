// @flow

import test from 'ava';
import surgeon from '../../../src';
import type {
  DenormalizedQueryType
} from '../../../src/types';

test('extracts a single value', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">
      <div class="bar">baz</div>
    </div>
  `;

  const query: DenormalizedQueryType = {
    adopt: {
      name: {
        extract: {
          name: 'textContent',
          type: 'property'
        },
        select: '.bar'
      }
    },
    select: '.foo'
  };

  t.deepEqual(x(query, subject), {
    name: 'baz'
  });
});

test('extracts multiple values', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  const query: DenormalizedQueryType = {
    adopt: {
      name: {
        extract: {
          name: 'class',
          type: 'attribute'
        },
        select: '::self'
      }
    },
    select: {
      quantifier: {
        max: Infinity
      },
      selector: '.foo'
    }
  };

  const expectedResult = [
    {
      name: 'foo'
    },
    {
      name: 'foo'
    }
  ];

  t.deepEqual(x(query, subject), expectedResult);
});
