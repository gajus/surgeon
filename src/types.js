// @flow

import {
  InvalidValueSentinel
} from './sentinels';

// eslint-disable-next-line no-use-before-define
export type CreateQueryType = (denormalizedQuery: DenormalizedQueryType, configuration?: CreateQueryFactoryConfigurationType) => QueryType;

export type TestActionFunctionQueryType = (value: mixed) => InvalidValueSentinel | boolean;

// eslint-disable-next-line flowtype/no-weak-types
export type TestActionFunctionFactoryQueryType = (...args: any) => TestActionFunctionQueryType;

export type CreateQueryFactoryConfigurationType = {|

  // eslint-disable-next-line no-use-before-define
  +subroutines: $PropertyType<ConfigurationType, 'subroutines'>
|};

export type EvaluatorType = {|

  // eslint-disable-next-line flowtype/no-weak-types
  +getAttributeValue: (element: Object, name: string) => string,

  // eslint-disable-next-line flowtype/no-weak-types
  +getPropertyValue: (element: Object, name: string) => mixed,

  // eslint-disable-next-line flowtype/no-weak-types
  +querySelectorAll: (element: Object, selector: string) => Array<Object>
|};

export type UserConfigurationType = {
  +evaluator?: EvaluatorType,

  // eslint-disable-next-line no-use-before-define
  +subroutines?: {
    test?: {
      [key: string]: TestActionFunctionFactoryQueryType
    }
  }
};

export type ConfigurationType = {|
  +evaluator: EvaluatorType,
  +subroutines: {
    test: {
      [key: string]: TestActionFunctionFactoryQueryType
    }
  }
|};

export type DenormalizedTestActionQueryType =
  string |
  RegExp |
  TestActionFunctionQueryType;

export type DenormalizedSelectActionQuantifierType =
  {|
    +max: number
  |} |
  {|
    +min: number
  |} |
  {|
    +max: number,
    +min: number
  |};

export type DenormalizedSelectActionQueryType =
  string |
  {|
    +quantifier?: DenormalizedSelectActionQuantifierType,
    +selector: string
  |};

// eslint-disable-next-line no-use-before-define
export type DenormalizedExtractActionQueryType = ExtractActionQueryType;

export type DenormalizedAdoptActionQueryType = {

  // eslint-disable-next-line no-use-before-define
  [key: string]: DenormalizedAdoptQueryType | DenormalizedExtractQueryType
};

type DenormalizedAdoptQueryType = {|
  +adopt: DenormalizedAdoptActionQueryType,
  +select: DenormalizedSelectActionQueryType
|};

type DenormalizedExtractQueryType = {|
  +extract?: DenormalizedExtractActionQueryType,
  +select: DenormalizedSelectActionQueryType,
  +test?: DenormalizedTestActionQueryType
|};

export type DenormalizedQueryType =
  string |
  DenormalizedAdoptQueryType |
  DenormalizedExtractQueryType;

export type TestActionQueryType = TestActionFunctionQueryType;

export type SelectActionQueryQuantifierType = {|
  +max: number,
  +min: number,
  +multiple: boolean
|};

export type SelectActionQueryType = {|
  +quantifier: SelectActionQueryQuantifierType,
  +selector: string
|};

export type ExtractActionQueryType = {|
  +type: 'attribute' | 'property',
  +name: string
|};

export type AdoptActionQueryType = {

  // eslint-disable-next-line no-use-before-define
  [key: string]: AdoptQueryType | ExtractQueryType
};

type AdoptQueryType = {|
  +adopt: AdoptActionQueryType,
  +select: SelectActionQueryType
|};

type ExtractQueryType = {|
  +extract?: ExtractActionQueryType,
  +select: SelectActionQueryType,
  +test?: TestActionQueryType
|};

export type QueryType =
  AdoptQueryType |
  ExtractQueryType;
