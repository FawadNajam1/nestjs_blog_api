import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | object;
    let error: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = exception.name;
      } else {
        message = (exceptionResponse as any).message || exception.message;
        error = (exceptionResponse as any).error || exception.name;
      }
    } else if (exception instanceof QueryFailedError) {
      // Handle TypeORM database errors
      status = HttpStatus.BAD_REQUEST;
      message = this.handleDatabaseError(exception);
      error = 'Database Error';
    } else if (exception instanceof Error) {
      // Handle generic errors
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : exception.message;
      error = 'Internal Server Error';
    } else {
      // Handle unknown errors
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
      error = 'Unknown Error';
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error,
      ...(process.env.NODE_ENV !== 'production' && {
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    };

    // Log the error
    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : exception,
    );

    response.status(status).json(errorResponse);
  }

  private handleDatabaseError(exception: QueryFailedError): string {
    const message = exception.message;

    // Handle specific database errors
    if (message.includes('duplicate key')) {
      return 'Resource already exists';
    }
    
    if (message.includes('foreign key constraint')) {
      return 'Referenced resource does not exist';
    }
    
    if (message.includes('not-null constraint')) {
      return 'Required field is missing';
    }
    
    if (message.includes('unique constraint')) {
      return 'Resource with this value already exists';
    }

    // Generic database error
    return process.env.NODE_ENV === 'production' 
      ? 'Database operation failed' 
      : message;
  }
}
