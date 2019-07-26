// @flow

import test from 'ava';
import cheerioEvaluator from '../../../../src/evaluators/cheerioEvaluator';

test('selects element by tag name', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const document = parseDocument('<div>foo</div>');
  const node = querySelectorAll(document, 'div')[0];

  t.true(getPropertyValue(node, 'textContent') === 'foo');
});

test('selects element by class name', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const document = parseDocument('<div class="foo">foo</div>');
  const node = querySelectorAll(document, '.foo')[0];

  t.true(getPropertyValue(node, 'textContent') === 'foo');
});

test('selects by attribute value [foo="bar"]', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const document = parseDocument('<div foo="bar">foo</div>');
  const node = querySelectorAll(document, '[foo="bar"]')[0];

  t.true(getPropertyValue(node, 'textContent') === 'foo');
});

test('selects by attribute value [foo*="bar"]', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const document = parseDocument('<div foo="barbaz">foo</div>');
  const node = querySelectorAll(document, '[foo*="bar"]')[0];

  t.true(getPropertyValue(node, 'textContent') === 'foo');
});
