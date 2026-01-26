import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ICreateTodoUseCase,
  IEditTodoUseCase,
  IGetAllTodoUseCase,
  TODO_TOKENS,
  TodoFilters
} from '../../../business-protocol/src/index';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { EditTodoDto } from './dtos/edit-todo.dto';
import { TodoResponseDto } from './dtos/todo-response.dto';

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  constructor(
    @Inject(TODO_TOKENS.CREATE_TODO_USECASE) private readonly createUseCase: ICreateTodoUseCase,
    @Inject(TODO_TOKENS.EDIT_TODO_USECASE) private readonly editUseCase: IEditTodoUseCase,
    @Inject(TODO_TOKENS.GET_ALL_TODO_USECASE) private readonly getAllUseCase: IGetAllTodoUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, type: TodoResponseDto })
  async create(@Body() dto: CreateTodoDto): Promise<TodoResponseDto> {
    const todo = await this.createUseCase.execute(dto);
    return TodoResponseDto.fromEntity(todo);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, type: [TodoResponseDto] })
  async findAll(
    @Query('title') title?: string,
    @Query('isDone') isDone?: string
  ): Promise<TodoResponseDto[]> {
    const filters: TodoFilters = {};
    if (title) filters.title = title;
    if (isDone !== undefined) filters.isDone = isDone === 'true';

    const todos = await this.getAllUseCase.execute({ filters });
    return todos.map(TodoResponseDto.fromEntity);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({ status: 200, type: TodoResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: EditTodoDto
  ): Promise<TodoResponseDto> {
    const todo = await this.editUseCase.execute({
      todoId: id,
      ...dto
    });
    return TodoResponseDto.fromEntity(todo);
  }
}
