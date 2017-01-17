// @flow

/**
 * @see https://github.com/gajus/surgeon#quantifier-expression
 * @see https://www.regex101.com/r/k3IuC4/1
 */
export const quantifierExpression = /\{(\d+?)(,?)(-?\d+)?\}(?:\[(\d+)\])?$/;

/**
 * @see https://github.com/gajus/surgeon#property-selector
 */
export const propertySelectorExpression = /(@\.[a-z][a-z0-1-]+)$/i;

/**
 * @see https://github.com/gajus/surgeon#attribute-selector
 * @see https://www.regex101.com/r/xiA8hy/1
 */
export const attributeSelectorExpression = /(@[a-z][a-z0-1-]+)$/i;
