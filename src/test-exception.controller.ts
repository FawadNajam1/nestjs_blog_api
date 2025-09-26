import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  BlogNotFoundException,
  BlogBadRequestException,
  BlogUnauthorizedException,
  BlogForbiddenException,
  BlogConflictException,
  BlogInternalServerErrorException,
  BlogValidationException,
} from './common/exceptions';

@ApiTags('test-exceptions')
@Controller('test-exceptions')
export class TestExceptionController {
  @Get('not-found')
  @ApiOperation({ summary: 'Test 404 Not Found exception' })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  testNotFound() {
    throw new BlogNotFoundException('Test Resource');
  }

  @Get('bad-request')
  @ApiOperation({ summary: 'Test 400 Bad Request exception' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  testBadRequest() {
    throw new BlogBadRequestException('This is a bad request');
  }

  @Get('unauthorized')
  @ApiOperation({ summary: 'Test 401 Unauthorized exception' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  testUnauthorized() {
    throw new BlogUnauthorizedException('You are not authorized');
  }

  @Get('forbidden')
  @ApiOperation({ summary: 'Test 403 Forbidden exception' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  testForbidden() {
    throw new BlogForbiddenException('Access denied');
  }

  @Get('conflict')
  @ApiOperation({ summary: 'Test 409 Conflict exception' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  testConflict() {
    throw new BlogConflictException('Resource already exists');
  }

  @Get('validation-error')
  @ApiOperation({ summary: 'Test validation exception' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  testValidationError() {
    throw new BlogValidationException(['Name is required', 'Email must be valid']);
  }

  @Get('internal-error')
  @ApiOperation({ summary: 'Test 500 Internal Server Error exception' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  testInternalError() {
    throw new BlogInternalServerErrorException('Something went wrong');
  }

  @Get('generic-error')
  @ApiOperation({ summary: 'Test generic error handling' })
  @ApiResponse({ status: 500, description: 'Generic error' })
  testGenericError() {
    throw new Error('This is a generic error');
  }

  @Get('database-error')
  @ApiOperation({ summary: 'Test database error handling' })
  @ApiResponse({ status: 400, description: 'Database error' })
  testDatabaseError() {
    // Simulate a database error
    const error = new Error('duplicate key value violates unique constraint');
    error.name = 'QueryFailedError';
    throw error;
  }
}
