// @flow

export default class InvalidValueSentinel {
  message: string;

  constructor (message: string) {
    this.message = message;
  }
}
