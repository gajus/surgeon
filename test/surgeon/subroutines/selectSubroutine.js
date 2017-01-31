import test from 'ava';
import sinon from 'sinon';
import selectSubroutine from '../../../src/subroutines/selectSubroutine';

test('returns array when expecting multiple results', (t): void => {
  const isElement = sinon.stub().returns(true);
  const querySelectorAll = sinon.stub().returns(['foo', 'bar']);

  const results = selectSubroutine({
    isElement,
    querySelectorAll
  }, null, ['.foo', '{0,}']);

  t.deepEqual(results, ['foo', 'bar']);
});

test('returns a single result when expecting at most 1 result', (t): void => {
  const isElement = sinon.stub().returns(true);
  const querySelectorAll = sinon.stub().returns(['foo']);

  const result = selectSubroutine({
    isElement,
    querySelectorAll
  }, null, ['.foo', '{0,1}']);

  t.true(result === 'foo');
});

test('returns an empty array when expecting multiple results', (t): void => {
  const isElement = sinon.stub().returns(true);
  const querySelectorAll = sinon.stub().returns([]);

  const results = selectSubroutine({
    isElement,
    querySelectorAll
  }, null, ['.foo', '{0,}']);

  t.deepEqual(results, []);
});

test('returns null when expecting at most 1 result', (t): void => {
  const isElement = sinon.stub().returns(true);
  const querySelectorAll = sinon.stub().returns([]);

  const result = selectSubroutine({
    isElement,
    querySelectorAll
  }, null, ['.foo', '{0,1}']);

  t.true(result === null);
});
