// @flow

import {
  parseCommand
} from '../parsers';
import type {
  DenormalizedQueryType,
  QueryType
} from '../types';

const createQuery = (denormalizedQuery: DenormalizedQueryType): QueryType => {
  if (typeof denormalizedQuery === 'string') {
    // eslint-disable-next-line no-param-reassign
    denormalizedQuery = [
      denormalizedQuery
    ];
  }

  const commands = [];

  for (const maybeCommand of denormalizedQuery) {
    if (typeof maybeCommand === 'string') {
      // @todo Rename to parseExpression.
      const expressionCommands = parseCommand(maybeCommand);

      for (const command of expressionCommands) {
        commands.push(command);
      }
    } else {
      const children = {};

      const childrenNames = Object.keys(maybeCommand);

      for (const childName of childrenNames) {
        children[childName] = createQuery(maybeCommand[childName]);
      }

      commands.push({
        parameters: [
          children
        ],
        subroutine: 'adopt'
      });
    }
  }

  return commands;
};

export default createQuery;
