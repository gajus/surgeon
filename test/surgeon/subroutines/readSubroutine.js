import test from 'ava';
import sinon from 'sinon';
import readSubroutine from '../../../src/subroutines/readSubroutine';

test('usus evalutor.isElement to validate the subject', (t): void => {
  const isElement = sinon.stub().returns(false);

  const error = t.throws(() => {
    readSubroutine({
      isElement
    }, null, []);
  });

  t.true(error.message === 'Unexpected value. Value must be an element.');
});

test('reading a property uses evaluator.getPropertyValue method', (t): void => {
  const isElement = sinon.stub.returns(true);
  const getPropertyValue = sinon.stub().returns('foo');

  const result = readSubroutine({
    getPropertyValue,
    isElement
  }, null, ['property']);

  t.true(result === 'foo');
});

test('reading an attribute uses evaluator.getAttributeValue method', (t): void => {
  const isElement = sinon.stub.returns(true);
  const getAttributeValue = sinon.stub().returns('bar');

  const result = readSubroutine({
    getAttributeValue,
    isElement
  }, null, ['attribute']);

  t.true(result === 'bar');
});

test('using unknown target throws an error', (t): void => {
  const isElement = sinon.stub.returns(true);

  const result = t.throws(() => {
    readSubroutine({
      isElement
    }, null, ['foo']);
  });

  t.true(result.message === 'Unexpected read target.');
});
