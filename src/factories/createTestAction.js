// @flow

import {
  createParser as createSelectorParser
} from 'scalpel';
import {
  regexTestSubroutine
} from '../subroutines/test';
import type {
  TestActionFunctionQueryType,
  TestActionFunctionFactoryQueryType
} from '../types';

const selectorParser = createSelectorParser();

export default (testDefinition: mixed, testSubroutines: {[key: string]: TestActionFunctionFactoryQueryType}): TestActionFunctionQueryType => {
  if (testDefinition instanceof RegExp) {
    return regexTestSubroutine(testDefinition.toString());
  } else if (typeof testDefinition === 'string') {
    // This is a simple "hack" that leverages the
    // pseudo class selector (https://github.com/gajus/scalpel#pseudoclassselector)
    // to parse string in a shape of "functionName(value)".

    const tokens = selectorParser.parse(':' + testDefinition);

    if (tokens.length !== 1) {
      throw new Error('Unexpected count of tokens.');
    }

    if (tokens[0].body.length !== 1) {
      throw new Error('Unexpected count of tokens.');
    }

    if (tokens[0].body[0].type !== 'pseudoClassSelector') {
      throw new Error('Unexpected token type.');
    }

    const {
      name,
      parameters
    } = tokens[0].body[0];

    if (!testSubroutines.hasOwnProperty(name)) {
      throw new Error('Unknown test subroutine.');
    }

    return testSubroutines[name](...parameters);
  } else if (typeof testDefinition === 'function') {
    return testDefinition;
  }

  throw new Error('Unexpected test value.');
};
