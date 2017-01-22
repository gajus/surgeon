import test from 'ava';
import surgeon, {
  NotFoundError
} from '../../src';

test('extracts property value', (t) => {
  const x = surgeon();

  t.true(x('.title@.tagName')('<div class="title"></div>') === 'DIV');
});

test('throws an error if attribute does not exist', (t) => {
  const x = surgeon();

  t.throws(() => {
    x('.title@.bar')('<div class="title"></div>');
  }, NotFoundError);
});
