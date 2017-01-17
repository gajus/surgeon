// @flow

import test from 'ava';
import hasPropertySelector from '../../src/utilities/hasPropertySelector';

test('returns true if the property selector is present', (t): void => {
  t.true(hasPropertySelector('a@.href') === true);
});

test('returns false if the property selector is not present', (t): void => {
  t.true(hasPropertySelector('a') === false);
});
