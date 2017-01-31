// @flow

import test from 'ava';
import {
  InvalidValueSentinel
} from '../../../src';
import testSubroutine from '../../../src/subroutines/testSubroutine';

test('throws an error if invoked with invalid RegExp', (t): void => {
  t.throws(() => {
    // $FlowFixMe
    testSubroutine(null, 'foo', ['/foo/x']);
  });
});

test('validates the input agaisnt the regex', (t): void => {
  // $FlowFixMe
  t.true(testSubroutine(null, 'foo', ['foo']) === 'foo');

  // $FlowFixMe
  t.true(testSubroutine(null, 'foo', ['bar']) instanceof InvalidValueSentinel);
});
