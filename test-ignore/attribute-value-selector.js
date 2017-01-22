import test from 'ava';
import surgeon, {
  NotFoundError
} from '../../src';

test('extracts attribute value', (t) => {
  const x = surgeon();

  t.true(x('.title@bar')('<div class="title" bar="baz">foo</div>') === 'baz');
});

test('throws an error if attribute does not exist', (t) => {
  const x = surgeon();

  t.throws(() => {
    x('.title@bar')('<div class="title">foo</div>');
  }, NotFoundError);
});
