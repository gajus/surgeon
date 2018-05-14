// @flow

import test from 'ava';
import {
  InvalidValueSentinel
} from '../../../src';
import testSubroutine from '../../../src/subroutines/testSubroutine';

test('throws an error if invoked with invalid RegExp', (t): void => {
  t.throws((): void => {
    testSubroutine('foo', ['/foo/x']);
  });
});

test('validates the input agaisnt the regex', (t): void => {
  t.true(testSubroutine('foo', ['foo']) === 'foo');
  t.true(testSubroutine('foo', ['bar']) instanceof InvalidValueSentinel);
});
