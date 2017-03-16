// @flow

import debug from 'debug';

export default (namespace: string) => {
  return debug('surgeon:' + namespace);
};
