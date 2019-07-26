// @flow

import test from 'ava';
import cheerioEvaluator from '../../../../src/evaluators/cheerioEvaluator';

test('URI encodes "href" property', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const document = parseDocument('<a href="http://foo.tdl/foo bar" />');
  const node = querySelectorAll(document, 'a')[0];

  t.true(getPropertyValue(node, 'href') === 'http://foo.tdl/foo%20bar');
});

test('URI encodes "src" property', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const document = parseDocument('<img src="http://foo.tdl/foo bar" />');
  const node = querySelectorAll(document, 'img')[0];

  t.true(getPropertyValue(node, 'src') === 'http://foo.tdl/foo%20bar');
});

test('returns textContent property value', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const document = parseDocument('<div>foo</div>');
  const node = querySelectorAll(document, 'div')[0];

  t.true(getPropertyValue(node, 'textContent') === 'foo');
});

test('returns outerHTML property value', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const document = parseDocument('<div>foo</div>');
  const node = querySelectorAll(document, 'div')[0];

  t.true(getPropertyValue(node, 'outerHTML') === '<div>foo</div>');
});

// This test is disabled as XML mode is breaking parsing of tags
// that contain unescaped tags within them.
// @see https://github.com/cheeriojs/cheerio/issues/1211
// eslint-disable-next-line ava/no-skip-test
test.skip('returns outerHTML property value (table)', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  // This test ensures that the DOM is loaded with {xmlMode: true}.
  // @see https://github.com/cheeriojs/cheerio/issues/1192
  const document = parseDocument('<td>foo</td>');

  const nodes = querySelectorAll(document, 'td');

  t.true(nodes.length === 1);

  t.true(getPropertyValue(nodes[0], 'outerHTML') === '<td>foo</td>');
});

test('returns outerHTML property value (tag within a tag)', (t) => {
  const {
    getPropertyValue,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const document = parseDocument('<script>"<br>"</script>');

  const nodes = querySelectorAll(document, 'script');

  t.true(nodes.length === 1);

  t.true(getPropertyValue(nodes[0], 'outerHTML') === '<script>"<br>"</script>');
});
