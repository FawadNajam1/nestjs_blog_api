# Global Exception Handler

This directory contains the global exception handling system for the NestJS Blog API.

## Files

- `exceptions/custom.exceptions.ts` - Custom exception classes for different HTTP status codes
- `filters/global-exception.filter.ts` - Global exception filter that catches and handles all exceptions
- `exceptions/index.ts` - Export file for custom exceptions
- `filters/index.ts` - Export file for filters
- `index.ts` - Main export file

## Usage

### Custom Exceptions

The following custom exceptions are available:

```typescript
import {
  BlogNotFoundException,
  BlogBadRequestException,
  BlogUnauthorizedException,
  BlogForbiddenException,
  BlogConflictException,
  BlogInternalServerErrorException,
  BlogValidationException,
} from './common/exceptions';

// Usage examples
throw new BlogNotFoundException('User');
throw new BlogBadRequestException('Invalid input');
throw new BlogUnauthorizedException('Invalid credentials');
throw new BlogForbiddenException('Access denied');
throw new BlogConflictException('User already exists');
throw new BlogInternalServerErrorException('Database connection failed');
throw new BlogValidationException(['Name is required', 'Email must be valid']);
```

### Global Exception Filter

The global exception filter automatically handles:

1. **HTTP Exceptions** - Standard NestJS HTTP exceptions
2. **Database Errors** - TypeORM QueryFailedError with specific error messages
3. **Generic Errors** - Any other Error instances
4. **Unknown Errors** - Any other exception types

### Error Response Format

All errors are returned in a consistent format:

```json
{
  "statusCode": 404,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/posts/123",
  "method": "GET",
  "message": "Post not found",
  "error": "Not Found",
  "stack": "Error stack trace (only in development)"
}
```

### Testing

Test the exception handler using the test endpoints:

- `GET /test-exceptions/not-found` - 404 error
- `GET /test-exceptions/bad-request` - 400 error
- `GET /test-exceptions/unauthorized` - 401 error
- `GET /test-exceptions/forbidden` - 403 error
- `GET /test-exceptions/conflict` - 409 error
- `GET /test-exceptions/validation-error` - 400 validation error
- `GET /test-exceptions/internal-error` - 500 error
- `GET /test-exceptions/generic-error` - Generic error
- `GET /test-exceptions/database-error` - Database error

## Environment Variables

The exception handler respects the `NODE_ENV` environment variable:

- **Development**: Shows detailed error messages and stack traces
- **Production**: Shows generic error messages without sensitive information

## Database Error Handling

The filter automatically handles common database errors:

- **Duplicate key**: "Resource already exists"
- **Foreign key constraint**: "Referenced resource does not exist"
- **Not-null constraint**: "Required field is missing"
- **Unique constraint**: "Resource with this value already exists"
- **Generic database errors**: "Database operation failed" (production) or original message (development)
