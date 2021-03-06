// @flow

import pianola from 'pianola';
import {
  createConfiguration,
} from './factories';
import {
  InvalidDataError,
  ReadSubroutineNotFoundError,
  SelectSubroutineUnexpectedResultCountError,
  SurgeonError,
} from './errors';
import {
  browserEvaluator,
  cheerioEvaluator,
} from './evaluators';
import {
  InvalidValueSentinel,
} from './sentinels';
import {
  appendSubroutine,
  closestSubroutine,
  constantSubroutine,
  formatSubroutine,
  matchSubroutine,
  nextUntilSubroutine,
  prependSubroutine,
  previousSubroutine,
  readSubroutine,
  removeSubroutine,
  selectSubroutine,
  testSubroutine,
} from './subroutines';
import subroutineAliasPreset from './subroutineAliasPreset';
import type {
  DenormalizedQueryType,
  UserConfigurationType,
} from './types';

const builtInSubroutines = {
  append: appendSubroutine,
  closest: closestSubroutine,
  constant: constantSubroutine,
  format: formatSubroutine,
  match: matchSubroutine,
  nextUntil: nextUntilSubroutine,
  prepend: prependSubroutine,
  previous: previousSubroutine,
  read: readSubroutine,
  remove: removeSubroutine,
  select: selectSubroutine,
  test: testSubroutine,
};

export type {
  SubroutineType,
} from './types';

export {
  appendSubroutine,
  browserEvaluator,
  cheerioEvaluator,
  closestSubroutine,
  constantSubroutine,
  formatSubroutine,
  InvalidDataError,
  InvalidValueSentinel,
  matchSubroutine,
  nextUntilSubroutine,
  prependSubroutine,
  previousSubroutine,
  readSubroutine,
  ReadSubroutineNotFoundError,
  removeSubroutine,
  selectSubroutine,
  SelectSubroutineUnexpectedResultCountError,
  subroutineAliasPreset,
  SurgeonError,
  testSubroutine,
};

export default (userConfiguration?: UserConfigurationType) => {
  const configuration = createConfiguration(userConfiguration);

  const subroutines = {
    ...configuration.subroutines,
    ...builtInSubroutines,
  };

  const handleResult = (resultValue, inputValue) => {
    if (resultValue instanceof InvalidValueSentinel) {
      throw new InvalidDataError(inputValue, resultValue);
    }
  };

  const x = pianola({
    bindle: {
      evaluator: configuration.evaluator,
    },
    handleResult,
    subroutines,
  });

  // eslint-disable-next-line flowtype/no-weak-types
  return (instructions: DenormalizedQueryType, subject: string | Object) => {
    const startValue = typeof subject === 'string' ? configuration.evaluator.parseDocument(subject) : subject;

    return x(instructions, startValue);
  };
};
