import test from 'ava';
import {
  NotFoundError
} from '../../../src';
import parseQuantifierExpression from '../../../src/utilities/parseQuantifierExpression';

test('returns the quantifier expression', (t): void => {
  t.deepEqual(parseQuantifierExpression('{1}'), {
    expression: '{1}',
    max: 1,
    min: 1
  });
  t.deepEqual(parseQuantifierExpression('{1,1}'), {
    expression: '{1,1}',
    max: 1,
    min: 1
  });
  t.deepEqual(parseQuantifierExpression('{1,}'), {
    expression: '{1,}',
    max: Infinity,
    min: 1
  });
  t.deepEqual(parseQuantifierExpression('{0,1}'), {
    expression: '{0,1}',
    max: 1,
    min: 0
  });
});

test('throws an error if the quantifier expression is not present', (t): void => {
  t.throws(() => {
    parseQuantifierExpression('');
  }, NotFoundError);
});
