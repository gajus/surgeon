// @flow

import Ajv from 'ajv';
import addAjvKeywords from 'ajv-keywords';
import denormalizedQueryShema from '../schemas/denormalizedQueryShema.json';
import type {
  DenormalizedQueryType
} from '../types';

const ajv = new Ajv({
  v5: true
});

addAjvKeywords(ajv);

const validate = ajv.compile(denormalizedQueryShema);

export default (denormalizedQuery: DenormalizedQueryType, log: boolean = true): void => {
  if (!validate(denormalizedQuery)) {
    if (log) {
      // eslint-disable-next-line
      console.log('query', denormalizedQuery);

      // eslint-disable-next-line
      console.error('Validation errors', validate.errors);
    }

    throw new Error('Invalid query.');
  }
};
