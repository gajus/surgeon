// @flow

import {
  Parser
} from 'nearley';
import expressionGrammar from '../grammars/expressionGrammar';
import {
  SurgeonError
} from '../errors';
import type {
  CommandType
} from '../types';

export default (expression: string): Array<CommandType> => {
  const parser = new Parser(expressionGrammar.ParserRules, expressionGrammar.ParserStart);

  const results = parser.feed(expression).results;

  if (results.length === 0) {
    throw new SurgeonError('Found no parsings.');
  }

  if (results.length > 1) {
    throw new SurgeonError('Ambiguous results.');
  }

  return results[0];
};
