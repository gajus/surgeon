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
    <div class="foo">bar</div>
  `;

  const query = 'select .foo | ra class';

  t.true(x(query, subject) === 'foo');
});

test('so: selects a single element', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo">bar</div>
  `;

  const query = 'so .foo | read property textContent';

  t.true(x(query, subject) === 'bar');
});

test('so: selects a single element (not found)', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="bar">bar</div>
  `;

  const query = 'so .foo | read property textContent';

  t.throws((): void => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});

test('sm: selects multiple elements', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo">bar</div>
    <div class="foo">bar</div>
  `;

  const query = 'sm .foo | read property textContent';

  t.deepEqual(x(query, subject), ['bar', 'bar']);
});

test('sm: selects multiple elements (not found)', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="bar">bar</div>
    <div class="bar">bar</div>
  `;

  const query = 'sm .foo | read property textContent';

  t.throws((): void => {
    x(query, subject);
  }, SelectSubroutineUnexpectedResultCountError);
});

test('sa: selects multiple elements', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="foo">bar</div>
    <div class="foo">bar</div>
  `;

  const query = 'sa .foo | read property textContent';

  t.deepEqual(x(query, subject), ['bar', 'bar']);
});

test('sa: selects multiple elements (no matches, no error)', (t): void => {
  const x = surgeon({
    subroutines: subroutineAliasPreset
  });

  const subject = `
    <div class="bar">bar</div>
    <div class="bar">bar</div>
  `;

  const query = 'sa .foo | read property textContent';

  t.deepEqual(x(query, subject), []);
});
