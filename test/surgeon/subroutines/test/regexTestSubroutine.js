// @flow

import test from 'ava';
import {
  InvalidValueSentinel
} from '../../../../src';
import {
  regexTestSubroutine
} from '../../../../src/subroutines/test';

test('throws an error if invoked with invalid RegExp', (t): void => {
  t.throws(() => {
    regexTestSubroutine('/foo/x');
  });
});

test('produces a function that validates the input agaisnt the regex', (t): void => {
  const testFunction = regexTestSubroutine('foo');

  t.true(testFunction('foo') === true);
  t.true(testFunction('bar') instanceof InvalidValueSentinel);
});
