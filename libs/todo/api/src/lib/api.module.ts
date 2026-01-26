import { Module } from '@nestjs/common';
import { TodoController } from './api.controller';

@Module({
  controllers: [TodoController], // Register the controller
  providers: [],
  exports: [],
})
export class ApiModule {}
