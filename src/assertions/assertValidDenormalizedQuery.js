// @flow

import Ajv from 'ajv';
import denormalizedQueryShema from '../schemas/denormalizedQueryShema.json';
import {
  SurgeonError
} from '../errors';
import type {
  DenormalizedQueryType
} from '../types';

const ajv = new Ajv();

const validate = ajv.compile(denormalizedQueryShema);

export default (denormalizedQuery: DenormalizedQueryType, log: boolean = true): void => {
  if (!validate(denormalizedQuery)) {
    if (log) {
      // eslint-disable-next-line
      console.log('query', denormalizedQuery);

      // eslint-disable-next-line
      console.error('Validation errors', validate.errors);
    }

    throw new SurgeonError('Invalid query.');
  }
};
