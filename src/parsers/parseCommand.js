// @flow

import {
  Parser
} from 'nearley';
import commandGrammar from '../grammars/commandGrammar';
import {
  SurgeonError
} from '../errors';
import type {
  CommandType
} from '../types';

export default (command: string): Array<CommandType> => {
  const parser = new Parser(commandGrammar.ParserRules, commandGrammar.ParserStart);

  const results = parser.feed(command).results;

  if (results.length === 0) {
    throw new SurgeonError('Found no parsings.');
  }

  if (results.length > 1) {
    throw new SurgeonError('Ambiguous results.');
  }

  return results[0];
};
