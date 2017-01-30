// @flow

import type {
  ConfigurationType,
  EvaluatorType,
  UserConfigurationType
} from '../types';
import {
  browserEvaluator,
  cheerioEvaluator
} from '../evaluators';
import {
  isEnvironmentBrowser
} from '../utilities';
import {
  regexTestSubroutine
} from '../subroutines/test';

const configureEvaluator = (): EvaluatorType => {
  const environmentIsBrowser = isEnvironmentBrowser();

  const evaluatorName = environmentIsBrowser ? 'browser' : 'cheerio';

  if (evaluatorName === 'cheerio') {
    return cheerioEvaluator();
  }

  if (evaluatorName === 'browser') {
    return browserEvaluator();
  }

  throw new Error('Unknown adapter.');
};

const configureSubroutines = (userSubroutines = {}): $PropertyType<ConfigurationType, 'subroutines'> => {
  const testSubroutines = Object.assign(
    {},
    {
      regex: regexTestSubroutine
    },
    userSubroutines.test || {}
  );

  return {
    test: testSubroutines
  };
};

export default (userConfiguration: UserConfigurationType = {}): ConfigurationType => {
  const evaluator = userConfiguration.evaluator || configureEvaluator();
  const subroutines = configureSubroutines(userConfiguration.subroutines);

  return {
    evaluator,
    subroutines
  };
};
