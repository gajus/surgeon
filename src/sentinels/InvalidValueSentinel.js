// @flow

/* eslint-disable fp/no-class, fp/no-this */

export default class InvalidValueSentinel {
  message: string;

  constructor (message: string = 'Unexpected value.') {
    this.message = message;
  }
}
