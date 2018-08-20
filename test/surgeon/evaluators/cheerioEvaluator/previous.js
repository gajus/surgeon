// @flow

import test from 'ava';
import cheerioEvaluator from '../../../../src/evaluators/cheerioEvaluator';

test('returns the previous node', (t) => {
  const {
    previous,
    parseDocument,
    querySelectorAll
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
