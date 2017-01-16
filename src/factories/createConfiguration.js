// @flow

import type {
  ConfigurationType,
  UserConfigurationType
} from '../types';
import {
  browserEvaluator,
  cheerioEvaluator
} from '../evaluators';

export default (userConfiguration: UserConfigurationType = {}): ConfigurationType => {
  let evaluator;

  if (!userConfiguration.evaluator || userConfiguration.evaluator === 'cheerio') {
    evaluator = cheerioEvaluator();
  } else if (userConfiguration.evaluator === 'browser') {
    evaluator = browserEvaluator();
  } else {
    throw new Error('Unknown adapter.');
  }

  return {
    evaluator
  };
};
