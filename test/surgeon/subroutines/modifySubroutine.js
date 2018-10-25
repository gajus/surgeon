// @flow

import test from 'ava';
import sinon from 'sinon';
import cheerioEvaluator from '../../../src/evaluators/cheerioEvaluator';
import modifySubroutine from '../../../src/subroutines/modifySubroutine';
import readSubroutine from '../../../src/subroutines/readSubroutine';
import selectSubroutine from '../../../src/subroutines/selectSubroutine';

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

test('modifying multiple attributes using selector works and returns the modified dom', (t): void => {
  const evaluator = cheerioEvaluator();
  const {parseDocument} = evaluator;
  const dom = parseDocument(`<body>
  <a href="/relative1">Relative link 1</div>
  <a href="/relative2">Relative link 2</div>
</body>`);
  const value = 'newValue';
  const modifiedDom = modifySubroutine(dom, ['body a', 'attribute', 'href', value], {evaluator});

  // $FlowFixMe
  selectSubroutine(modifiedDom, ['a', '{0,}'], {evaluator}).forEach((el) => { // eslint-disable-line no-extra-parens
    const result = readSubroutine(el, ['attribute', 'href'], {evaluator});

    t.true(result === value);
  });
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

test('modifying multiple properties works and returns the modified dom', (t): void => {
  const evaluator = cheerioEvaluator();
  const {parseDocument} = evaluator;
  const dom = parseDocument(`<body>
  <input type="checkbox"/>
  <input type="checkbox"/>
</body>`);
  const value = true;
  const modifiedDom = modifySubroutine(dom, ['body input', 'property', 'checked', value], {evaluator});

  // $FlowFixMe
  selectSubroutine(modifiedDom, ['body input', '{0,}'], {evaluator}).forEach((el) => {
    const result = readSubroutine(el, ['property', 'checked'], {evaluator});

    t.true(result === value);
  });
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
