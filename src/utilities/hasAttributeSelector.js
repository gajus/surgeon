// @flow

import {
  attributeSelectorExpression
} from '../expressions';

export default (selector: string): boolean => {
  return attributeSelectorExpression.test(selector);
};
