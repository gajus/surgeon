import test from 'ava';
import surgeon, {
  UnexpectedResultCountError
} from '../../src';

test('extracts innerText', (t) => {
  const x = surgeon();

  const document = `
    <div class="title">foo</div>
    <div class="title">bar</div>
  `;

  const schema = {
    selector: '.title {0,}'
  };

  t.deepEqual(x(document, schema), ['foo', 'bar']);
});

// test('throws error if too few nodes are matched', (t) => {
//   const x = surgeon();
//
//   t.throws(() => {
//     x('.title {1,}')('');
//   }, UnexpectedResultCountError);
// });
//
// test('throws error if too many nodes are matched', (t) => {
//   const x = surgeon();
//
//   t.throws(() => {
//     x('.title {0,1}')('<div class="title">foo</div><div class="title">bar</div>');
//   }, UnexpectedResultCountError);
// });
