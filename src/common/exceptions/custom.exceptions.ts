import { HttpException, HttpStatus } from '@nestjs/common';

export class BlogNotFoundException extends HttpException {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, HttpStatus.NOT_FOUND);
  }
}

export class BlogBadRequestException extends HttpException {
  constructor(message: string = 'Bad Request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class BlogUnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class BlogForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class BlogConflictException extends HttpException {
  constructor(message: string = 'Conflict') {
    super(message, HttpStatus.CONFLICT);
  }
}

export class BlogInternalServerErrorException extends HttpException {
  constructor(message: string = 'Internal Server Error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class BlogValidationException extends HttpException {
  constructor(message: string | string[] = 'Validation failed') {
    super(
      {
        message: 'Validation failed',
        errors: Array.isArray(message) ? message : [message],
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
