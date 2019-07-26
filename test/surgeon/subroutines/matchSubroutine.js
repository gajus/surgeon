// @flow

import test from 'ava';
import {
  InvalidValueSentinel,
} from '../../../src';
import matchSubroutine from '../../../src/subroutines/matchSubroutine';

test('throws an error if invoked with invalid RegExp', (t): void => {
  t.throws((): void => {
    matchSubroutine('foo', ['/foo/x']);
  });
});

test('throws an error if regex does not define capturing groups', (t) => {
  t.throws((): void => {
    matchSubroutine('foo', ['foo']);
  }, 'Regular expression must define at least one capturing group.');
});

test('returns InvalidValueSentinel when input cannot be matched', (t) => {
  const error = matchSubroutine('baz', ['(foo)']);

  if (!(error instanceof InvalidValueSentinel)) {
    throw new TypeError('Unexpected state.');
  }

  t.true(error instanceof InvalidValueSentinel);
  t.true(error.message === 'Input does not match "/(foo)/" regular expression.');
});

test('matches a single capturing group', (t) => {
  t.true(matchSubroutine('foobar', ['(foo)']) === 'foo');
});

test('throws an error when matching multiple capturing groups without sprintf template', (t) => {
  t.throws((): void => {
    matchSubroutine('foobar', ['(foo)(bar)']);
  }, 'Must define sprintf template when matching multiple groups.');
});

test('formats multiple capturing group matches using sprintf', (t) => {
  t.true(matchSubroutine('foobar', ['(foo)(bar)', '%2$s-%1$s']) === 'bar-foo');
});
