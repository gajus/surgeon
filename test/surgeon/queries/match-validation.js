// @flow

import test from 'ava';
import sinon from 'sinon';
import surgeon, {
  InvalidDataError
} from '../../../src';
import {
  InvalidValueSentinel
} from '../../../src/sentinels';
import type {
  DenormalizedQueryType
} from '../../../src/types';

test('returns result if data is valid (RegExp)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = {
    select: '.foo',
    test: /bar/
  };

  t.true(x(query, subject) === 'bar');
});

test('throws InvalidDataError if data does not pass validation (RegExp)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = {
    select: '.foo',
    test: /baz/
  };

  t.throws(() => {
    x(query, subject);
  }, InvalidDataError);
});

test('invokes test function with InvalidValueSentinel and subject value', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const spy = sinon.spy();

  const query: DenormalizedQueryType = {
    select: '.foo',
    test: spy
  };

  x(query, subject);

  t.true(spy.calledWith('bar'));
});

test('returns result if data is valid (user defined function)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = {
    select: '.foo',
    test: () => {
      return true;
    }
  };

  t.true(x(query, subject) === 'bar');
});

test('throws InvalidDataError if data does not pass validation (user defined function; returns InvalidValueSentinel)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = {
    select: '.foo',
    test: () => {
      return new InvalidValueSentinel('does not pass the test');
    }
  };

  t.throws(() => {
    x(query, subject);
  }, InvalidDataError);
});

test('throws InvalidDataError if data does not pass validation (user defined function; returns false)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = {
    select: '.foo',
    test: () => {
      return false;
    }
  };

  t.throws(() => {
    x(query, subject);
  }, InvalidDataError);
});

test('returns result if data is valid (in-built function)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = {
    select: '.foo',
    test: 'regex(bar)'
  };

  t.true(x(query, subject) === 'bar');
});

test('throws InvalidDataError if data does not pass validation (in-built function)', (t): void => {
  const x = surgeon();

  const subject = `
    <div class="foo">bar</div>
  `;

  const query: DenormalizedQueryType = {
    select: '.foo',
    test: 'regex(baz)'
  };

  t.throws(() => {
    x(query, subject);
  }, InvalidDataError);
});
