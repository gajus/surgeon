// @flow

// eslint-disable-next-line flowtype/no-weak-types
type ElementType = Object;

// eslint-disable-next-line flowtype/no-weak-types
type BindleType = Object;

export type EvaluatorType = {|
  +clone: (element: ElementType) => ElementType,
  +getAttributeValue: (element: ElementType, name: string) => string,
  +getPropertyValue: (element: ElementType, name: string) => mixed,
  +isElement: (maybeElement: mixed) => boolean,
  +nextUntil: (element: ElementType, selector: string, filter?: string) => $ReadOnlyArray<ElementType>,
  +parseDocument: (subject: string) => ElementType,
  +querySelectorAll: (element: ElementType, selector: string) => $ReadOnlyArray<ElementType>,
  +remove: (element: ElementType) => void
|};

export type SubroutineType = (subject: mixed, parameters: $ReadOnlyArray<string>, bindle: BindleType) => mixed;

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
  $ReadOnlyArray<string | QueryChildrenType> |
  QueryChildrenType;
