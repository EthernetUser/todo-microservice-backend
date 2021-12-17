import { HttpStatus } from '@nestjs/common';

export class AppResponse<T> {
  statusCode: number | null;
  error: boolean;
  message: string | null;
  data: T | null;

  constructor({
    statusCode = HttpStatus.OK,
    error = false,
    message = null,
    data = null,
  }) {
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
    this.data = data;
  }
}
