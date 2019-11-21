// @flow

import test from 'ava';
import sinon from 'sinon';
import nextUntilSubroutine from '../../../src/subroutines/nextUntilSubroutine';

test('returns array when expecting multiple results', (t) => {
  const isElement = sinon.stub().returns(true);
  const nextUntil = sinon.stub().returns(['foo', 'bar']);

  const evaluator = {
    isElement,
    nextUntil,
  };

  const results = nextUntilSubroutine(null, ['.foo', '.bar'], {evaluator});

  t.true(nextUntil.calledWith(null, '.foo', '.bar'));

  t.deepEqual(results, ['foo', 'bar']);
});
