// @flow

import test from 'ava';
import cheerioEvaluator from '../../../../src/evaluators/cheerioEvaluator';

test('returns textContent property value', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll
  } = cheerioEvaluator();

  const document = parseDocument('<div>foo</div>');
  const node = querySelectorAll(document, 'div')[0];

  t.true(getPropertyValue(node, 'textContent') === 'foo');
});

test('returns outerHTML property value', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll
  } = cheerioEvaluator();

  const document = parseDocument('<div>foo</div>');
  const node = querySelectorAll(document, 'div')[0];

  t.true(getPropertyValue(node, 'outerHTML') === '<div>foo</div>');
});

test('returns innerHTML property value', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll
  } = cheerioEvaluator();

  const document = parseDocument('<div><span>foo</span></div>');
  const node = querySelectorAll(document, 'div')[0];

  t.true(getPropertyValue(node, 'innerHTML') === '<span>foo</span>');
});
