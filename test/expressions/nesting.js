import test from 'ava';
import surgeon from '../../src';

test('matches single descendant node', (t) => {
  const x = surgeon();

  const document = `
  <article>
    <div class='title'>foo title</div>
    <div class='body'>foo body</div>
  </article>
  <article>
    <div class='title'>bar title</div>
    <div class='body'>bar body</div>
  </article>
  `;

  const result = x('article {0,}', {
    body: x('.body'),
    title: x('.title')
  })(document);

  t.deepEqual(result, [
    {
      body: 'foo body',
      title: 'foo title'
    },
    {
      body: 'bar body',
      title: 'bar title'
    }
  ]);
});

test('matches multiple descendant nodes', (t) => {
  const x = surgeon();

  const document = `
  <article>
    <div class='title'>foo title</div>
    <p>A0</p>
    <p>B0</p>
    <p>C0</p>
  </article>
  <article>
    <div class='title'>bar title</div>
    <p>A1</p>
    <p>B1</p>
    <p>C1</p>
  </article>
  `;

  const result = x('article {0,}', {
    paragraphs: x('p {0,}'),
    title: x('.title')
  })(document);

  t.deepEqual(result, [
    {
      paragraphs: [
        'A0',
        'B0',
        'C0'
      ],
      title: 'foo title'
    },
    {
      paragraphs: [
        'A1',
        'B1',
        'C1'
      ],
      title: 'bar title'
    }
  ]);
});
