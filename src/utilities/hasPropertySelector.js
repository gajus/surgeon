// @flow

import {
  propertySelectorExpression
} from '../expressions';

export default (selector: string): boolean => {
  return propertySelectorExpression.test(selector);
};
