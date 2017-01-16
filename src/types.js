// @flow

export type AttributeSelectorType = {|
  +attributeName: string,
  +expression: string
|};

export type PropertySelectorType = {|
  +propertyName: string,
  +expression: string
|};

export type QuantifierType = {|
  +accessor: number | null,
  +expression?: string,
  +max: number,
  +min: number
|};

export type UserConfigurationType = {
  +evaluator?: 'cheerio' | 'browser'
};

export type EvaluatorType = {|
  +getAttribute: Function,
  +getProperty: Function,
  +querySelectorAll: Function
|};

export type ConfigurationType = {|
  +evaluator: EvaluatorType
|};
