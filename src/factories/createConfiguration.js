// @flow

import type {
  ConfigurationType,
  UserConfigurationType
} from '../types';
import {
  browserEvaluator,
  cheerioEvaluator
} from '../evaluators';
import {
  isEnvironmentBrowser
} from '../utilities';

export default (userConfiguration: UserConfigurationType = {}): ConfigurationType => {
  let evaluator;

  let evaluatorName = userConfiguration.evaluator;

  if (!evaluatorName) {
    const environmentIsBrowser = isEnvironmentBrowser();

    evaluatorName = environmentIsBrowser ? 'browser' : 'cheerio';
  }

  if (evaluatorName === 'cheerio') {
    evaluator = cheerioEvaluator();
  } else if (evaluatorName === 'browser') {
    evaluator = browserEvaluator();
  } else {
    throw new Error('Unknown adapter.');
  }

  return {
    evaluator
  };
};
