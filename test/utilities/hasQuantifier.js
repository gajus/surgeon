// @flow

import test from 'ava';
import hasQuantifier from '../../src/utilities/hasQuantifier';

test('returns true if the quantifier expression is present', (t): void => {
  t.true(hasQuantifier('{1}') === true);
  t.true(hasQuantifier('{1,}') === true);
  t.true(hasQuantifier('{0,1}') === true);
  t.true(hasQuantifier('{1}[0]') === true);
  t.true(hasQuantifier('{1,}[0]') === true);
  t.true(hasQuantifier('{0,1}[0]') === true);
});

test('returns false if the quantifier expression is not present', (t): void => {
  t.true(hasQuantifier('.foo') === false);
});
