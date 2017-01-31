// @flow

export default class InvalidValueSentinel {
  message: string;

  constructor (message: string = 'Unexpected value.') {
    this.message = message;
  }
}
