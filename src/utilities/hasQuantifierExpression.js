// @flow

import {
  quantifierExpression
} from '../expressions';

export default (selector: string): boolean => {
  return quantifierExpression.test(selector);
};
