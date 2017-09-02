// @flow

export type EvaluatorType = {|

  // eslint-disable-next-line flowtype/no-weak-types
  +getAttributeValue: (element: Object, name: string) => string,

  // eslint-disable-next-line flowtype/no-weak-types
  +getPropertyValue: (element: Object, name: string) => mixed,

  +isElement: (maybeElement: mixed) => boolean,

  // eslint-disable-next-line flowtype/no-weak-types
  +nextUntil: (element: Object, selector: string, filter?: string) => Array<Object>,

  // eslint-disable-next-line flowtype/no-weak-types
  +parseDocument: (subject: string) => Object,

  // eslint-disable-next-line flowtype/no-weak-types
  +querySelectorAll: (element: Object, selector: string) => Array<Object>
|};

// eslint-disable-next-line flowtype/no-weak-types
export type SubroutineType = (subject: mixed, parameters: Array<string>, bindle: Object) => mixed;

export type SelectSubroutineQuantifierType = {|
  +index: number | null,
  +max: number,
  +min: number
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

type QueryChildrenType = {

  // eslint-disable-next-line no-use-before-define
  [key: string]: DenormalizedQueryType
};

export type DenormalizedQueryType =
  string |
  Array<string | QueryChildrenType>;
