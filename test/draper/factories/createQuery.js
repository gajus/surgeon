// @flow

import test from 'ava';
import createQuery from '../../../src/factories/createQuery';

test('converts string expressions to subroutines', (t): void => {
  const denormalizedQuery = [
    'foo',
    'bar'
  ];

  const query = [
    {
      parameters: [],
      subroutine: 'foo'
    },
    {
      parameters: [],
      subroutine: 'bar'
    }
  ];

  t.deepEqual(createQuery(denormalizedQuery), query);
});

test('concatenates multiple subroutines', (t): void => {
  const denormalizedQuery = [
    'foo0 | foo1 | foo2',
    'bar'
  ];

  const query = [
    {
      parameters: [],
      subroutine: 'foo0'
    },
    {
      parameters: [],
      subroutine: 'foo1'
    },
    {
      parameters: [],
      subroutine: 'foo2'
    },
    {
      parameters: [],
      subroutine: 'bar'
    }
  ];

  t.deepEqual(createQuery(denormalizedQuery), query);
});

test('converts simple object command into "adopt" subroutine (string expression)', (t): void => {
  const denormalizedQuery = [
    'foo',
    'bar',
    {
      baz: 'baz0',
      qux: 'qux0'
    }
  ];

  const query = [
    {
      parameters: [],
      subroutine: 'foo'
    },
    {
      parameters: [],
      subroutine: 'bar'
    },
    {
      parameters: [
        {
          baz: [
            {
              parameters: [],
              subroutine: 'baz0'
            }
          ],
          qux: [
            {
              parameters: [],
              subroutine: 'qux0'
            }
          ]
        }
      ],
      subroutine: 'adopt'
    }
  ];

  t.deepEqual(createQuery(denormalizedQuery), query);
});

test('converts simple object command into "adopt" subroutine (array expression)', (t): void => {
  const denormalizedQuery = [
    'foo',
    'bar',
    {
      baz: [
        'baz0'
      ],
      qux: [
        'qux0'
      ]
    }
  ];

  const query = [
    {
      parameters: [],
      subroutine: 'foo'
    },
    {
      parameters: [],
      subroutine: 'bar'
    },
    {
      parameters: [
        {
          baz: [
            {
              parameters: [],
              subroutine: 'baz0'
            }
          ],
          qux: [
            {
              parameters: [],
              subroutine: 'qux0'
            }
          ]
        }
      ],
      subroutine: 'adopt'
    }
  ];

  t.deepEqual(createQuery(denormalizedQuery), query);
});
