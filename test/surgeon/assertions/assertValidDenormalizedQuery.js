// @flow

import test from 'ava';
import {
  assertValidDenormalizedQuery
} from '../../../src/assertions';

test('throws an error when invalid query is provided', (t): void => {
  t.throws(() => {
    // $FlowFixMe
    assertValidDenormalizedQuery({}, false);
  });

  t.throws(() => {
    // $FlowFixMe
    assertValidDenormalizedQuery({
      adopt: {
        name: {
          select: 'div'
        }
      },
      extract: {
        name: 'textContent',
        type: 'property'
      },
      select: 'div'
    }, false);
  });
});
