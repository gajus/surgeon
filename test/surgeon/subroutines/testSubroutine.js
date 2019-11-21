// @flow

import test from 'ava';
import {
  InvalidValueSentinel,
} from '../../../src';
import testSubroutine from '../../../src/subroutines/testSubroutine';

test('throws an error if invoked with invalid RegExp', (t) => {
  t.throws(() => {
    testSubroutine('foo', ['/foo/x']);
  });
});

test('validates the input against the regex', (t) => {
  t.true(testSubroutine('foo', ['foo']) === 'foo');
});

test('returns InvalidValueSentinel when input cannot be matched', (t) => {
  const error = testSubroutine('foo', ['bar']);

  if (!(error instanceof InvalidValueSentinel)) {
    throw new TypeError('Unexpected state.');
  }

  t.true(error instanceof InvalidValueSentinel);

  t.is(error.message, 'Input does not match "/bar/" regular expression.');
});
