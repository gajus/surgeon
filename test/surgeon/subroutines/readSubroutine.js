// @flow

import test from 'ava';
import sinon from 'sinon';
import readSubroutine from '../../../src/subroutines/readSubroutine';

test('uses evalutor.isElement to validate the subject', (t): void => {
  const isElement = sinon.stub().returns(false);

  const evaluator = {
    isElement
  };

  const error = t.throws((): void => {
    readSubroutine(null, [], {evaluator});
  });

  t.true(error.message === 'Unexpected value. Value must be an element.');
});

test('reading a property uses evaluator.getPropertyValue method', (t): void => {
  const isElement = sinon.stub().returns(true);
  const getPropertyValue = sinon.stub().returns('foo');

  const evaluator = {
    getPropertyValue,
    isElement
  };

  const result = readSubroutine(null, ['property'], {evaluator});

  t.true(result === 'foo');
});

test('reading an attribute uses evaluator.getAttributeValue method', (t): void => {
  const isElement = sinon.stub().returns(true);
  const getAttributeValue = sinon.stub().returns('bar');

  const evaluator = {
    getAttributeValue,
    isElement
  };

  const result = readSubroutine(null, ['attribute'], {evaluator});

  t.true(result === 'bar');
});

test('using unknown target throws an error', (t): void => {
  const isElement = sinon.stub().returns(true);

  const evaluator = {
    isElement
  };

  const result = t.throws((): void => {
    readSubroutine(null, ['foo'], {evaluator});
  });

  t.true(result.message === 'Unexpected read target.');
});
