// @flow

import {
  createConfiguration,
  createQuery
} from './factories';
import {
  InvalidDataError,
  ReadSubroutineNotFoundError,
  SelectSubroutineUnexpectedResultCountError,
  SurgeonError
} from './errors';
import {
  browserEvaluator,
  cheerioEvaluator
} from './evaluators';
import {
  InvalidValueSentinel
} from './sentinels';
import subroutines from './subroutines';
import type {
  DenormalizedQueryType,
  UserConfigurationType
} from './types';

export {
  browserEvaluator,
  cheerioEvaluator,
  InvalidDataError,
  InvalidValueSentinel,
  ReadSubroutineNotFoundError,
  SelectSubroutineUnexpectedResultCountError,
  SurgeonError
};

const queryDocument = (userSubroutines, evaluator, instructions, rootNode) => {
  let result = rootNode;

  let index = 0;

  for (const instruction of instructions) {
    if (instruction.subroutine === 'adopt') {
      const children = {};

      if (instruction.parameters.length !== 1) {
        throw new SurgeonError('Unexpected parameter length.');
      }

      if (typeof instruction.parameters[0] !== 'object') {
        throw new SurgeonError('test');
      }

      const childrenNames = Object.keys(instruction.parameters[0]);

      for (const childName of childrenNames) {
        children[childName] = queryDocument(userSubroutines, evaluator, instruction.parameters[0][childName], result);
      }

      return children;
    }

    const lastResult = result;

    result = subroutines[instruction.subroutine](evaluator, result, instruction.parameters);

    if (result instanceof InvalidValueSentinel) {
      throw new InvalidDataError(lastResult, result);
    }

    index++;

    if (Array.isArray(result)) {
      const remainingInstructions = instructions.slice(index);

      return result.map((newRootNode) => {
        return queryDocument(userSubroutines, evaluator, remainingInstructions, newRootNode);
      });
    }
  }

  return result;
};

export default (userConfiguration?: UserConfigurationType) => {
  const configuration = createConfiguration(userConfiguration);

  const userSubroutines = {
    ...configuration.subroutines,
    ...subroutines
  };

  // eslint-disable-next-line flowtype/no-weak-types
  return (instructions: DenormalizedQueryType, subject: string | Object) => {
    const query = createQuery(instructions);

    return queryDocument(
      userSubroutines,
      configuration.evaluator,
      query,
      typeof subject === 'string' ? configuration.evaluator.parseDocument(subject) : subject
    );
  };
};
