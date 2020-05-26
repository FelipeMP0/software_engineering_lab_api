export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;
  readonly name!: string;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(message: string | object = 'Bad Request') {
    super(message);
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(message: string | object = 'Not found') {
    super(message);
  }
}
