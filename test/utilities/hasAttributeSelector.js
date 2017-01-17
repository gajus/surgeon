// @flow

import test from 'ava';
import hasAttributeSelector from '../../src/utilities/hasAttributeSelector';

test('returns true if the attribute selector is present', (t): void => {
  t.true(hasAttributeSelector('a@href') === true);
});

test('returns false if the attribute selector is not present', (t): void => {
  t.true(hasAttributeSelector('a') === false);
});
