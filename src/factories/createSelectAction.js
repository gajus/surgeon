// @flow

import type {
  DenormalizedSelectActionQueryType,
  SelectActionQueryType
} from '../types';

export default (selectAction: DenormalizedSelectActionQueryType): SelectActionQueryType => {
  if (typeof selectAction === 'string') {
    return {
      quantifier: {
        max: 1,
        min: 1,
        multiple: false
      },
      selector: selectAction
    };
  }

  let quantifier = selectAction.quantifier;

  if (quantifier && quantifier.max === 1) {
    quantifier = {
      max: 1,
      min: 0,
      multiple: false,
      ...quantifier
    };
  } else if (quantifier) {
    quantifier = {
      max: Infinity,
      min: 0,
      multiple: true,
      ...quantifier
    };
  } else {
    quantifier = {
      max: 1,
      min: 1,
      multiple: false
    };
  }

  return {
    quantifier,
    selector: selectAction.selector
  };
};
