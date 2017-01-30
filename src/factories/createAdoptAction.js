// @flow

import type {
  AdoptActionQueryType,
  CreateQueryFactoryConfigurationType,
  CreateQueryType,
  DenormalizedAdoptActionQueryType
} from '../types';

export default (
  adoptAction: DenormalizedAdoptActionQueryType,
  createQuery: CreateQueryType,
  configuration: CreateQueryFactoryConfigurationType
): AdoptActionQueryType => {
  const childrenNames = Object.keys(adoptAction);

  const children = {};

  for (const childName of childrenNames) {
    children[childName] = createQuery(adoptAction[childName], configuration);
  }

  return children;
};
