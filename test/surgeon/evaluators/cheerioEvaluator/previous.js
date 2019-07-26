// @flow

import test from 'ava';
import cheerioEvaluator from '../../../../src/evaluators/cheerioEvaluator';

test('returns the previous node', (t) => {
  const {
    previous,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const body = `
    <ul>
      <li class='foo'>1</li>
      <li class='bar'>2</li>
    </ul>
  `;

  const document = parseDocument(body);
  const nodes = querySelectorAll(document, 'li');

  t.true(nodes.length === 2);

  const previousNode = previous(nodes[1]);

  t.true(previousNode.text() === '1');
});

test('returns previous node matching the selector', (t) => {
  const {
    previous,
    parseDocument,
    querySelectorAll,
  } = cheerioEvaluator();

  const body = `
    <ul>
      <li class='foo'>0</li>
      <li class='foo'>1</li>
      <li class='bar'>2</li>
      <li class='baz'>3</li>
    </ul>
  `;

  const document = parseDocument(body);
  const nodes = querySelectorAll(document, 'li');

  t.true(nodes.length === 4);

  const previousNode = previous(nodes[2], '.foo');

  t.true(previousNode.text() === '1');
});
