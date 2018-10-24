// @flow

import test from 'ava';
import sinon from 'sinon';
import cheerioEvaluator from '../../../src/evaluators/cheerioEvaluator';
import modifySubroutine from '../../../src/subroutines/modifySubroutine';
import readSubroutine from '../../../src/subroutines/readSubroutine';

test('uses evalutor.isElement to validate the subject', (t): void => {
  const isElement = sinon.stub().returns(false);

  const evaluator = {
    isElement
  };

  const error = t.throws((): void => {
    modifySubroutine(null, [], {evaluator});
  });

  t.true(error.message === 'Unexpected value. Value must be an element.');
});

test('modifying an attribute works and returns modified node', (t): void => {
  const evaluator = cheerioEvaluator();
  const {parseDocument, querySelectorAll} = evaluator;
  const document = parseDocument('<a href="/relative">Relative link</div>');
  const node = querySelectorAll(document, 'a')[0];
  const value = 'http://www.example.com/relative';
  const modifiedNode = modifySubroutine(node, ['attribute', 'href', value], {evaluator});
  const result = readSubroutine(modifiedNode, ['attribute', 'href'], {evaluator});

  t.true(result === value);
});

test('modifying an property works and returns modified node', (t): void => {
  const evaluator = cheerioEvaluator();
  const {parseDocument, querySelectorAll} = evaluator;
  const document = parseDocument('<input type="checkbox"/>');
  const node = querySelectorAll(document, 'input')[0];
  const value = true;
  const modifiedNode = modifySubroutine(node, ['property', 'checked', value], {evaluator});
  const result = readSubroutine(modifiedNode, ['property', 'checked'], {evaluator});

  t.true(result === value);
});

test('using unknown target throws an error', (t): void => {
  const isElement = sinon.stub().returns(true);

  const evaluator = {
    isElement
  };

  const result = t.throws((): void => {
    modifySubroutine(null, ['foo'], {evaluator});
  });

  t.true(result.message === 'Unexpected modify target.');
});
