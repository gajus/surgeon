// @flow

import test from 'ava';
import hasQuantifierExpression from '../../../src/utilities/hasQuantifierExpression';

test('returns true if the quantifier expression is present', (t): void => {
  t.true(hasQuantifierExpression('{1}') === true);
  t.true(hasQuantifierExpression('{1,}') === true);
  t.true(hasQuantifierExpression('{0,1}') === true);
});

test('returns false if the quantifier expression is not present', (t): void => {
  t.true(hasQuantifierExpression('.foo') === false);
});
