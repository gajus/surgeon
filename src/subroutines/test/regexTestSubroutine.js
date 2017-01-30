// @flow

import parseRegex from 'regex-parser';
import {
  InvalidValueSentinel
} from '../../sentinels';

export default (userRule: string) => {
  const rule: RegExp = parseRegex(userRule);

  // eslint-disable-next-line consistent-return
  return (value: mixed) => {
    if (typeof value !== 'string') {
      throw new Error('Input is not a string.');
    }

    if (!rule.test(value)) {
      return new InvalidValueSentinel('input does not match "' + rule.toString() + '" regular expression');
    }

    return true;
  };
};
