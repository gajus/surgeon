// @flow

import test from 'ava';
import tokenizeSelector from '../../src/tokenizeSelector';

test('returns cssSelector', (t): void => {
  const tokens = tokenizeSelector('.foo');

  t.deepEqual(tokens, {
    cssSelector: '.foo'
  });
});

test('returns quantifier expression', (t): void => {
  const tokens = tokenizeSelector('.foo {0,1}');

  t.deepEqual(tokens, {
    cssSelector: '.foo',
    quantifier: {
      max: 1,
      min: 0
    }
  });
});

test('returns "extract" action expression', (t): void => {
  const tokens = tokenizeSelector('.foo @extract(foo, bar)');

  t.deepEqual(tokens, {
    cssSelector: '.foo',
    extract: {
      name: 'bar',
      type: 'foo'
    }
  });
});

test('returns "test" action expression', (t): void => {
  const tokens = tokenizeSelector('.foo @test(foo, bar)');

  t.deepEqual(tokens, {
    cssSelector: '.foo',
    test: 'foo("bar")'
  });
});

test('unknown expression throws an error', (t): void => {
  t.throws(() => {
    tokenizeSelector('.foo @foo(bar)');
  });
});
