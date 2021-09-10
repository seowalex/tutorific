export default class Exception extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  toObject(): Object {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
