// @flow

import test from 'ava';
import formatSubroutine from '../../../src/subroutines/formatSubroutine';

test('throws an error if subject is not a string', (t): void => {
  const error = t.throws((): void => {
    // $FlowFixMe
    formatSubroutine(123);
  });

  t.is(error.message, 'Input is not a string.');
});

test('default format returns subject', (t): void => {
  t.is(formatSubroutine('foo'), 'foo');
});

test('formats string using printf', (t): void => {
  t.is(formatSubroutine('bar', ['foo%1$sbaz']), 'foobarbaz');
});
