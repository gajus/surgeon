// @flow

import {
  browserEvaluator,
  cheerioEvaluator,
} from '../evaluators';
import {
  isEnvironmentBrowser,
} from '../utilities';
import {
  SurgeonError,
} from '../errors';
import type {
  ConfigurationType,
  EvaluatorType,
  UserConfigurationType,
} from '../types';

const configureEvaluator = (): EvaluatorType => {
  const environmentIsBrowser = isEnvironmentBrowser();

  const evaluatorName = environmentIsBrowser ? 'browser' : 'cheerio';

  if (evaluatorName === 'cheerio') {
    return cheerioEvaluator();
  }

  if (evaluatorName === 'browser') {
    return browserEvaluator();
  }

  throw new SurgeonError('Unknown adapter.');
};

export default (userConfiguration: UserConfigurationType = {}): ConfigurationType => {
  const evaluator = userConfiguration.evaluator || configureEvaluator();
  const subroutines = userConfiguration.subroutines || {};

  return {
    evaluator,
    subroutines,
  };
};
