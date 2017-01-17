// @flow

import test from 'ava';
import {
  NotFoundError
} from '../../src';
import getPropertySelector from '../../src/utilities/getPropertySelector';

test('returns the property selector', (t): void => {
  t.deepEqual(getPropertySelector('a@.textContent'), {
    expression: '@.textContent',
    propertyName: 'textContent'
  });
});

test('throws an error if the property selector is not present', (t): void => {
  t.throws(() => {
    getPropertySelector('a');
  }, NotFoundError);
});
