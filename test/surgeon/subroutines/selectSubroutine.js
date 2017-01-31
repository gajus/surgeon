import test from 'ava';
import sinon from 'sinon';
import selectSubroutine from '../../../src/subroutines/selectSubroutine';

test('returns array when expecting multiple results', (t): void => {
  const isElement = sinon.stub().returns(true);
  const querySelectorAll = sinon.stub().returns(['foo', 'bar']);

  const evaluator = {
    isElement,
    querySelectorAll
  };

  const results = selectSubroutine(null, ['.foo', '{0,}'], {evaluator});

  t.deepEqual(results, ['foo', 'bar']);
});

test('returns a single result when expecting at most 1 result', (t): void => {
  const isElement = sinon.stub().returns(true);
  const querySelectorAll = sinon.stub().returns(['foo']);

  const evaluator = {
    isElement,
    querySelectorAll
  };

  const result = selectSubroutine(null, ['.foo', '{0,1}'], {evaluator});

  t.true(result === 'foo');
});

test('returns an empty array when expecting multiple results', (t): void => {
  const isElement = sinon.stub().returns(true);
  const querySelectorAll = sinon.stub().returns([]);

  const evaluator = {
    isElement,
    querySelectorAll
  };

  const results = selectSubroutine(null, ['.foo', '{0,}'], {evaluator});

  t.deepEqual(results, []);
});

test('returns null when expecting at most 1 result', (t): void => {
  const isElement = sinon.stub().returns(true);
  const querySelectorAll = sinon.stub().returns([]);

  const evaluator = {
    isElement,
    querySelectorAll
  };

  const result = selectSubroutine(null, ['.foo', '{0,1}'], {evaluator});

  t.true(result === null);
});
