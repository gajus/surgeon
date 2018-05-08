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

test('returns outerHTML property value (table)', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll
  } = cheerioEvaluator();

  // This test ensures that the DOM is loaded with {xmlMode: true}.
  // @see https://github.com/cheeriojs/cheerio/issues/1192
  const document = parseDocument('<td>foo</td>');

  const nodes = querySelectorAll(document, 'td');

  t.true(nodes.length === 1);

  t.true(getPropertyValue(nodes[0], 'outerHTML') === '<td>foo</td>');
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
