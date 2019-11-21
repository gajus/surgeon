// @flow

import test from 'ava';
import formatSubroutine from '../../../src/subroutines/formatSubroutine';

test('throws an error if subject is not a string', (t) => {
  t.throws(() => {
    // $FlowFixMe
    formatSubroutine(123);
  }, 'Input is not a string.');
});

test('default format returns subject', (t) => {
  t.is(formatSubroutine('foo'), 'foo');
});

test('formats string using printf', (t) => {
  t.is(formatSubroutine('bar', ['foo%1$sbaz']), 'foobarbaz');
});
