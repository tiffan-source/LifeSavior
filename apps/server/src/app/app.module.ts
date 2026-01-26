import { Module } from '@nestjs/common';
import { TodoController } from '@org/api';
import {
  CreateTodoUseCase,
  EditTodoUseCase,
  GetAllTodoUseCase
} from '@org/business-logic';
import { TODO_TOKENS } from '@org/business-protocol';
import {
  DefaultLabelFactory,
  DefaultTodoFactory
} from '@org/todo-domain-model';
import {
  InMemoryLabelRepository,
  InMemoryTodoRepository
} from '@org/infrastructure';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    // --- Infrastructure (Repositories) ---
    {
      provide: TODO_TOKENS.TODO_REPOSITORY,
      useClass: InMemoryTodoRepository, // Singleton by default
    },
    {
      provide: TODO_TOKENS.LABEL_REPOSITORY,
      useClass: InMemoryLabelRepository,
    },

    // --- Domain (Factories) ---
    {
      provide: TODO_TOKENS.TODO_FACTORY,
      useClass: DefaultTodoFactory,
    },
    {
      provide: TODO_TOKENS.LABEL_FACTORY,
      useClass: DefaultLabelFactory,
    },

    // --- Application (Use Cases) ---
    // Manually wiring because UseCases are framework-agnostic (no @Inject)
    {
      provide: TODO_TOKENS.CREATE_TODO_USECASE,
      useFactory: (todoRepo, labelRepo, todoFactory, labelFactory) =>
        new CreateTodoUseCase(todoRepo, labelRepo, todoFactory, labelFactory),
      inject: [
        TODO_TOKENS.TODO_REPOSITORY,
        TODO_TOKENS.LABEL_REPOSITORY,
        TODO_TOKENS.TODO_FACTORY,
        TODO_TOKENS.LABEL_FACTORY,
      ],
    },
    {
      provide: TODO_TOKENS.EDIT_TODO_USECASE,
      useFactory: (todoRepo, labelRepo) =>
        new EditTodoUseCase(todoRepo, labelRepo),
      inject: [TODO_TOKENS.TODO_REPOSITORY, TODO_TOKENS.LABEL_REPOSITORY],
    },
    {
      provide: TODO_TOKENS.GET_ALL_TODO_USECASE,
      useFactory: (todoRepo) => new GetAllTodoUseCase(todoRepo),
      inject: [TODO_TOKENS.TODO_REPOSITORY],
    },
  ],
})
export class AppModule {}
