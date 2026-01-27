import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo.controller';
import { LabelController } from './controllers/label.controller';
import {
  CreateTodoUseCase,
  GetAllTodoUseCase,
  EditTodoUseCase,
  DeleteTodoUseCase,
  GetAllLabelsUseCase,
  EditLabelUseCase,
} from '@org/todo-business-logic';
import { TODO_TOKENS } from '@org/todo-business-protocol';
import {
  InMemoryTodoRepositoryImpl,
  InMemoryLabelRepositoryImpl,
  TodoFactoryImpl,
  LabelFactoryImpl,
} from '@org/todo-infra';

@Module({
  controllers: [TodoController, LabelController],
  providers: [
    // Repositories
    {
      provide: TODO_TOKENS.TODO_REPOSITORY,
      useClass: InMemoryTodoRepositoryImpl,
    },
    {
      provide: TODO_TOKENS.LABEL_REPOSITORY,
      useClass: InMemoryLabelRepositoryImpl,
    },
    // Factories
    {
      provide: TODO_TOKENS.TODO_FACTORY,
      useClass: TodoFactoryImpl,
    },
    {
      provide: TODO_TOKENS.LABEL_FACTORY,
      useClass: LabelFactoryImpl,
    },
    // Use Cases
    {
      provide: TODO_TOKENS.CREATE_TODO_USECASE,
      useFactory: (
        todoRepo: any,
        labelRepo: any,
        todoFactory: any,
        labelFactory: any
      ) =>
        new CreateTodoUseCase(todoRepo, labelRepo, todoFactory, labelFactory),
      inject: [
        TODO_TOKENS.TODO_REPOSITORY,
        TODO_TOKENS.LABEL_REPOSITORY,
        TODO_TOKENS.TODO_FACTORY,
        TODO_TOKENS.LABEL_FACTORY,
      ],
    },
    {
      provide: TODO_TOKENS.GET_ALL_TODO_USECASE,
      useFactory: (todoRepo: any) => new GetAllTodoUseCase(todoRepo),
      inject: [TODO_TOKENS.TODO_REPOSITORY],
    },
    {
      provide: TODO_TOKENS.EDIT_TODO_USECASE,
      useFactory: (todoRepo: any, labelRepo: any) =>
        new EditTodoUseCase(todoRepo, labelRepo),
      inject: [TODO_TOKENS.TODO_REPOSITORY, TODO_TOKENS.LABEL_REPOSITORY],
    },
    {
      provide: TODO_TOKENS.DELETE_TODO_USECASE,
      useFactory: (todoRepo: any) => new DeleteTodoUseCase(todoRepo),
      inject: [TODO_TOKENS.TODO_REPOSITORY],
    },
    {
      provide: TODO_TOKENS.GET_ALL_LABELS_USECASE,
      useFactory: (labelRepo: any) => new GetAllLabelsUseCase(labelRepo),
      inject: [TODO_TOKENS.LABEL_REPOSITORY],
    },
    {
      provide: TODO_TOKENS.EDIT_LABEL_USECASE,
      useFactory: (labelRepo: any) => new EditLabelUseCase(labelRepo),
      inject: [TODO_TOKENS.LABEL_REPOSITORY],
    },
  ],
})
export class TodoModule {}
