import test from 'ava';
import surgeon, {
  UnexpectedResultCountError
} from '../../src';

test('extracts textContent property value', (t) => {
  const x = surgeon();

  const document = '<div class="title">foo</div>';

  const schema = {
    selector: '.title'
  };

  t.true(x(document, schema) === 'foo');
  // t.true(x({
  //   selector: '.title {1}[0]'
  // }, '<div class="title">foo</div>') === 'foo');
  // t.true(x({
  //   selector: '.title {1,1}[0]'
  // }, '<div class="title">foo</div>') === 'foo');
});

// test('throws error if no nodes are matched', (t) => {
//   const x = surgeon();
//
//   t.throws(() => {
//     x('.title')('');
//   }, UnexpectedResultCountError);
//
//   t.throws(() => {
//     x('.title {1}[0]')('');
//   }, UnexpectedResultCountError);
//
//   t.throws(() => {
//     x('.title {1,1}[0]')('');
//   }, UnexpectedResultCountError);
// });
//
// test('throws error if more than one node is matched', (t) => {
//   const x = surgeon();
//
//   t.throws(() => {
//     x('.title')('<div class="title">foo</div><div class="title">bar</div>');
//     x('.title {1}[0]')('<div class="title">foo</div><div class="title">bar</div>');
//     x('.title {1,1}[0]')('<div class="title">foo</div><div class="title">bar</div>');
//   }, UnexpectedResultCountError);
// });
