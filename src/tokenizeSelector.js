// @flow

import {
  createGenerator as createSelectorGenerator,
  createParser as createSelectorParser
} from 'scalpel';
import trim from 'trim';
import {
  hasQuantifierExpression,
  parseQuantifierExpression
} from './utilities';

const selectorGenerator = createSelectorGenerator();
const selectorParser = createSelectorParser();

export default (selector: string) => {
  const result = {};

  /**
   * @todo This approach breaks with `.foo:contains("foo bar")` (among other countless examples).
   */
  const tokens = selector.split(' ', 1);

  result.cssSelector = tokens[0];

  let expression = trim(selector.slice(tokens[0].length));

  if (expression) {
    if (hasQuantifierExpression(expression)) {
      const quantifierTokens = parseQuantifierExpression(expression);

      result.quantifier = {
        max: quantifierTokens.max,
        min: quantifierTokens.min
      };

      expression = expression.slice(quantifierTokens.expression.length);
    }

    if (expression) {
      // CSS selector parser does not unerstand @expressions.
      // However, it understands pseudo class selectors.
      expression = expression
        .replace('@extract', ':extract')
        .replace('@test', ':test')
        .replace('@format', ':format');

      const expressionTokens = selectorParser.parse(expression);

      if (expressionTokens.length) {
        for (const expressionToken of expressionTokens[0].body) {
          if (expressionToken.type !== 'pseudoClassSelector') {
            throw new Error('Unexpected expression.');
          }

          if (expressionToken.name === 'extract') {
            result.extract = {
              name: expressionToken.parameters[1],
              type: expressionToken.parameters[0]
            };
          } else if (expressionToken.name === 'test') {
            result.test = selectorGenerator.generate([
              {
                body: [
                  {
                    name: expressionToken.parameters[0],
                    parameters: expressionToken.parameters.slice(1),
                    type: 'pseudoClassSelector'
                  }
                ],
                type: 'selector'
              }
            ]).slice(1);
          } else {
            throw new Error('Unexpected expression.');
          }
        }
      }
    }
  }

  return result;
};
