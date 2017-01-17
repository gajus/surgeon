// @flow

import test from 'ava';
import {
  NotFoundError
} from '../../src';
import getAttributeSelector from '../../src/utilities/getAttributeSelector';

test('returns the attribute selector', (t): void => {
  t.deepEqual(getAttributeSelector('a@href'), {
    attributeName: 'href',
    expression: '@href'
  });
});

test('throws an error if the attribute selector is not present', (t): void => {
  t.throws(() => {
    getAttributeSelector('a');
  }, NotFoundError);
});
