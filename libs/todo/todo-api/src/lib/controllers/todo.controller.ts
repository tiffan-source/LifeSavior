import { Controller, Get, Post, Put, Delete, Param, Body, UseFilters } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  IGetAllTodoUseCase,
  ICreateTodoUseCase,
  IEditTodoUseCase,
  IDeleteTodoUseCase,
  TODO_TOKENS,
} from '@org/todo-business-protocol';
import { Inject } from '@nestjs/common';
import { CreateTodoDto, TodoResponseDto } from '../dtos/todo.dto';
import { TodoPresenter } from '../presenters/todo.presenter';
import { BusinessErrorFilter } from '../filters/business-error.filter';

/**
 * Controller pour les endpoints TODO.
 * Utilise le pattern Presenter pour la transformation et la gestion d'erreur.
 */
@ApiTags('todos')
@Controller('todos')
@UseFilters(BusinessErrorFilter)
export class TodoController {
  private readonly presenter = new TodoPresenter();

  constructor(
    @Inject(TODO_TOKENS.CREATE_TODO_USECASE)
    private readonly createTodoUseCase: ICreateTodoUseCase,
    @Inject(TODO_TOKENS.GET_ALL_TODO_USECASE)
    private readonly getAllTodoUseCase: IGetAllTodoUseCase,
    @Inject(TODO_TOKENS.EDIT_TODO_USECASE)
    private readonly editTodoUseCase: IEditTodoUseCase,
    @Inject(TODO_TOKENS.DELETE_TODO_USECASE)
    private readonly deleteTodoUseCase: IDeleteTodoUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos', description: 'Retrieve a list of all todos' })
  @ApiResponse({ status: 200, description: 'List of todos', type: [TodoResponseDto] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAll(): Promise<TodoResponseDto[]> {
    try {
      const todos = await this.getAllTodoUseCase.execute({});
      return this.presenter.presentList(todos);
    } catch (error) {
      throw this.presenter.handleError(error as Error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo', description: 'Create a new todo item' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Todo created successfully', type: TodoResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() dto: CreateTodoDto): Promise<TodoResponseDto> {
    try {
      const todo = await this.createTodoUseCase.execute(dto);
      return this.presenter.present(todo);
    } catch (error) {
      throw this.presenter.handleError(error as Error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo', description: 'Update an existing todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 200, description: 'Todo updated successfully', type: TodoResponseDto })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async edit(
    @Param('id') id: string,
    @Body() dto: CreateTodoDto
  ): Promise<TodoResponseDto> {
    try {
      const todo = await this.editTodoUseCase.execute({
        todoId: id,
        ...dto,
      });
      return this.presenter.present(todo);
    } catch (error) {
      throw this.presenter.handleError(error as Error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo', description: 'Delete a todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 204, description: 'Todo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.deleteTodoUseCase.execute({ id });
    } catch (error) {
      throw this.presenter.handleError(error as Error);
    }
  }
}
