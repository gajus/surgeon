// @flow

import test from 'ava';
import surgeon from '../../../src';

test('using expression quantifier to return a single node', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  t.true(x('.foo {1}', subject) === 'bar');
});

test('using expression quantifier to return multiple nodes', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar0</div>
    <div class="foo">bar1</div>
  `;

  t.deepEqual(x('.foo {0,}', subject), [
    'bar0',
    'bar1'
  ]);
});

test('using expression quantifier to define "extract" action', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo" baz="qux">bar</div>
  `;

  t.true(x('.foo @extract(attribute, baz)', subject) === 'qux');
});

test('using expression quantifier to define "test" action', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  t.true(x('.foo @test(regex, bar)', subject) === 'bar');

  t.throws(() => {
    x('.foo @test(regex, baz)', subject);
  });
});
