import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandler {
  static handle(error: any) {
    console.error('error:', error);
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
