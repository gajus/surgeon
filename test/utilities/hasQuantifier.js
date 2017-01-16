// @flow

import test from 'ava';
import {
  hasQuantifier
} from '../../src/utilities';

test('returns true if quantifier is present', (t): void => {
  t.true(hasQuantifier('{1}') === true);
  t.true(hasQuantifier('{1,}') === true);
  t.true(hasQuantifier('{0,1}') === true);
  t.true(hasQuantifier('{1}[0]') === true);
  t.true(hasQuantifier('{1,}[0]') === true);
  t.true(hasQuantifier('{0,1}[0]') === true);
});

test('returns false if quantifier is not present', (t): void => {
  t.true(hasQuantifier('.foo') === false);
});
