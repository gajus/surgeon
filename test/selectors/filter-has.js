import test from 'ava';
import surgeon, {
  UnexpectedResultCountError
} from '../../src';

test('finds a node which satisfies a parent node selector', (t) => {
  const x = surgeon();

  const document = `
  <div>
    <article>
      <h1>foo</h1>
    </article>
    <article>
      <h1>bar</h1>
      <p></p>
    </article>
  </div>
  `;

  const schema = {
    filter: {
      has: 'p'
    },
    properties: {
      heading: 'h1'
    },
    selector: 'article'
  };

  t.true(x(document, schema).heading === 'bar');
});

test.only(':has() selector', (t) => {
  const x = surgeon();

  const document = `
  <div>
    <article>
      <h1>foo</h1>
    </article>
    <article>
      <h1>bar</h1>
      <p></p>
    </article>
  </div>
  `;

  const schema = {
    properties: {
      heading: 'h1'
    },
    selector: 'article:has(p)'
  };

  t.true(x(document, schema).heading === 'bar');
});
