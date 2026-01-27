import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  InvalidTodoTitleError,
  LabelNotFoundError,
  TodoNotFoundError,
} from '@org/todo-business-protocol';

/**
 * Exception Filter qui mappe les erreurs métier en réponses HTTP.
 * Catch les erreurs métier (CoreError) et les convertit en réponses HTTP typées.
 */
@Catch(
  InvalidTodoTitleError,
  TodoNotFoundError,
  LabelNotFoundError
)
export class BusinessErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.BAD_REQUEST;
    let code = 'UNKNOWN_ERROR';
    let message = exception.message;

    if (exception instanceof InvalidTodoTitleError) {
      statusCode = HttpStatus.BAD_REQUEST;
      code = 'INVALID_TODO_TITLE';
    } else if (exception instanceof TodoNotFoundError) {
      statusCode = HttpStatus.NOT_FOUND;
      code = 'TODO_NOT_FOUND';
    } else if (exception instanceof LabelNotFoundError) {
      statusCode = HttpStatus.NOT_FOUND;
      code = 'LABEL_NOT_FOUND';
    }

    response.status(statusCode).json({
      statusCode,
      code,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
