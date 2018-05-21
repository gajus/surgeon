// @flow

import test from 'ava';
import surgeon, {
  subroutineAliasPreset,
  SelectSubroutineUnexpectedResultCountError
} from '../../src';

test('rdtc: reads direct textNode textContent property', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo">bar<div>baz</div></div>
  `;

  const query = 'so .foo | rdtc';

  t.deepEqual(x(query, subject), 'bar');
});

test('rtc: reads textContent property', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo">bar<div>baz</div></div>
  `;

  const query = 'so .foo | rtc';

  t.deepEqual(x(query, subject), 'barbaz');
});

test('ra: reads element attribute', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo"></div>
  `;

  const query = 'select .foo | ra class';

  t.true(x(query, subject) === 'foo');
});

test('so: selects one element', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo">foo 0</div>
  `;

  const query = 'so .foo | read property textContent';

  t.true(x(query, subject) === 'foo 0');
});

test('so: selects one element (multiple matches)', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo">foo 0</div>
    <div class="foo">foo 1</div>
  `;

  const query = 'so .foo | read property textContent';

  t.throws((): void => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});

test('so: select one element (no matches)', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = '';

  const query = 'so .foo | read property textContent';

  t.throws((): void => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});

test('sm: selects many elements', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo">foo 0</div>
    <div class="foo">foo 1</div>
  `;

  const query = 'sm .foo | read property textContent';

  t.deepEqual(x(query, subject), ['foo 0', 'foo 1']);
});

test('sm: selects many elements (no matches)', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = '';

  const query = 'sm .foo | read property textContent';

  t.throws((): void => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});

test('sa: selects any elements', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo">foo 0</div>
    <div class="foo">foo 1</div>
  `;

  const query = 'sa .foo | read property textContent';

  t.deepEqual(x(query, subject), ['foo 0', 'foo 1']);
});

test('sa: selects any elements (no matches)', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = '';

  const query = 'sa .foo | read property textContent';

  t.deepEqual(x(query, subject), []);
});

test('saf: selects first out of any matches (multiple matches)', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
  <div class="foo">foo 0</div>
  <div class="foo">foo 1</div>
  `;

  const query = 'saf .foo | read property textContent';

  t.true(x(query, subject) === 'foo 0');
});

test('saf: selects first out of any matches (no matches)', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = '';

  const query = 'saf .foo | read property textContent';

  t.true(x(query, subject) === null);
});
