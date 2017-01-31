// @flow

export type EvaluatorType = {|

  // eslint-disable-next-line flowtype/no-weak-types
  +parseDocument: (subject: string) => Object,

  // eslint-disable-next-line flowtype/no-weak-types
  +getAttributeValue: (element: Object, name: string) => string,

  // eslint-disable-next-line flowtype/no-weak-types
  +getPropertyValue: (element: Object, name: string) => mixed,

  // eslint-disable-next-line flowtype/no-weak-types
  +querySelectorAll: (element: Object, selector: string) => Array<Object>
|};

export type CommandType = {|

  // eslint-disable-next-line flowtype/no-weak-types
  +parameters: Array<any>,
  +subroutine: string
|};

type QueryChildrenType = {

  // eslint-disable-next-line no-use-before-define
  [key: string]: DenormalizedQueryType
};

export type DenormalizedQueryType =
  string |
  Array<string | QueryChildrenType>;

export type QueryType = Array<CommandType>;

export type SubroutineType = (evaluator: EvaluatorType, subject: mixed, parameters: Array<string>) => mixed;

export type SelectSubroutineQuantifierType = {|
  +max: number,
  +min: number,
  +multiple: boolean
|};

export type UserConfigurationType = {
  +evaluator?: EvaluatorType,
  +subroutines?: {
    [key: string]: SubroutineType
  }
};

export type ConfigurationType = {|
  +evaluator: EvaluatorType,
  +subroutines: {
    [key: string]: SubroutineType
  }
|};
