// @flow

import test from 'ava';
import cheerio from 'cheerio';
import cheerioEvaluator from '../../../../src/evaluators/cheerioEvaluator';

test('identifies next nodes using a selector', (t) => {
  const {
    nextUntil,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const body = `
    <ul>
      <li class='foo'>1</li>
      <li class='bar'>2</li>
      <li class='bar'>3</li>
      <li class='baz'>4</li>
      <li class='bar'>5</li>
    </ul>
  `;

  const document = parseDocument(body);
  const nodes = querySelectorAll(document, 'li');

  t.true(nodes.length === 5);

  const nextNodes = nextUntil(nodes[0], '.baz');

  t.true(nextNodes.length === 2);
});

test('identifies next nodes using a selector and a filter', (t) => {
  const {
    nextUntil,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const body = `
    <li class='foo'>foo0</li>
    <li class='bar'>bar0</li>
    <li class='bar'>bar1</li>
    <li class='qux'>qux0</li>
    <li class='bar'>bar2</li>
    <li class='baz'>baz0</li>
  `;

  const document = parseDocument(body);
  const nodes = querySelectorAll(document, 'li');

  t.true(nodes.length === 6);

  const nextNodes = nextUntil(nodes[0], '.baz', ':not(.qux)');

  t.true(nextNodes.length === 3);
});

// @see https://github.com/cheeriojs/cheerio/issues/1194

// eslint-disable-next-line ava/no-skip-test
test.skip('filters out matching nodes', (t) => {
  const body = `
    <li class='foo'>foo0</li>
    <li class='bar'>bar0</li>
    <li class='bar'>bar1</li>
    <li class='qux'>qux0</li>
    <li class='bar'>bar2</li>
    <li class='baz'>baz0</li>
  `;

  const nodes = cheerio
    .load(body, {
      xmlMode: true,
    })
    .root()
    .find('li')
    .eq(0)
    .nextUntil('.baz', ':not(:nth-child(4))');

  t.true(nodes.length === 3);
});
