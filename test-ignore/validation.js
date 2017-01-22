import test from 'ava';
import surgeon, {
  InvalidDataError
} from '../../src';

test('extracts textContent property value', (t) => {
  const x = surgeon();

  t.true(x('div', /foo/)('<div>foo</div>') === 'foo');
});

test('throws error if no nodes are matched', (t) => {
  const x = surgeon();

  t.throws(() => {
    x('div', /bar/)('<div>foo</div>');
  }, InvalidDataError);
});
