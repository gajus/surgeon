// @flow

import test from 'ava';
import surgeon, {
  subroutineAliasPreset,
  SelectSubroutineUnexpectedResultCountError,
} from '../../src';

test('rdtc: reads direct textNode textContent property', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = `
    <div class="foo">bar<div>baz</div></div>
  `;

  const query = 'so .foo | rdtc';

  t.is(await x(query, subject), 'bar');
});

test('rdtc: trims value', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = `
    <div class="foo">
      bar
      <div>baz</div>
    </div>
  `;

  const query = 'so .foo | rdtc';

  t.is(await x(query, subject), 'bar');
});

test('rtc: reads textContent property', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = `
    <div class="foo">bar<div>baz</div></div>
  `;

  const query = 'so .foo | rtc';

  t.is(await x(query, subject), 'barbaz');
});

test('ra: reads element attribute', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = `
    <div class="foo"></div>
  `;

  const query = 'select .foo | ra class';

  t.is(await x(query, subject), 'foo');
});

test('so: selects one element', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = `
    <div class="foo">foo 0</div>
  `;

  const query = 'so .foo | read property textContent';

  t.is(await x(query, subject), 'foo 0');
});

test('so: selects one element (multiple matches)', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = `
    <div class="foo">foo 0</div>
    <div class="foo">foo 1</div>
  `;

  const query = 'so .foo | read property textContent';

  const error = await t.throwsAsync(x(query, subject));

  t.true(error instanceof SelectSubroutineUnexpectedResultCountError);
});

test('so: select one element (no matches)', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = '';

  const query = 'so .foo | read property textContent';

  const error = await t.throwsAsync(x(query, subject));

  t.true(error instanceof SelectSubroutineUnexpectedResultCountError);
});

test('sm: selects many elements', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = `
    <div class="foo">foo 0</div>
    <div class="foo">foo 1</div>
  `;

  const query = 'sm .foo | read property textContent';

  t.deepEqual(await x(query, subject), ['foo 0', 'foo 1']);
});

test('sm: selects many elements (no matches)', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = '';

  const query = 'sm .foo | read property textContent';

  const error = await t.throwsAsync(x(query, subject));

  t.true(error instanceof SelectSubroutineUnexpectedResultCountError);
});

test('sa: selects any elements', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = `
    <div class="foo">foo 0</div>
    <div class="foo">foo 1</div>
  `;

  const query = 'sa .foo | read property textContent';

  t.deepEqual(await x(query, subject), ['foo 0', 'foo 1']);
});

test('sa: selects any elements (no matches)', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = '';

  const query = 'sa .foo | read property textContent';

  t.deepEqual(await x(query, subject), []);
});

test('saf: selects first out of any matches (multiple matches)', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = `
  <div class="foo">foo 0</div>
  <div class="foo">foo 1</div>
  `;

  const query = 'saf .foo | read property textContent';

  t.is(await x(query, subject), 'foo 0');
});

test('saf: selects first out of any matches (no matches)', async (t) => {
  const x = surgeon({
    subroutines: subroutineAliasPreset,
  });

  const subject = '';

  const query = 'saf .foo | read property textContent';

  t.is(await x(query, subject), null);
});
