import { Controller, Get, Post, Put, Delete, Param, Body, UseFilters } from '@nestjs/common';
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
  async getAll(): Promise<TodoResponseDto[]> {
    try {
      const todos = await this.getAllTodoUseCase.execute();
      return this.presenter.presentList(todos);
    } catch (error) {
      this.presenter.handleError(error as Error);
    }
  }

  @Post()
  async create(@Body() dto: CreateTodoDto): Promise<TodoResponseDto> {
    try {
      const todo = await this.createTodoUseCase.execute(dto);
      return this.presenter.present(todo);
    } catch (error) {
      this.presenter.handleError(error as Error);
    }
  }

  @Put(':id')
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
      this.presenter.handleError(error as Error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.deleteTodoUseCase.execute({ id });
    } catch (error) {
      this.presenter.handleError(error as Error);
    }
  }
}
