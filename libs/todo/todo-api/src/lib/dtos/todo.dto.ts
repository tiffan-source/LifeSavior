/**
 * DTO pour créer une todo.
 */
export interface CreateTodoDto {
  title: string;
  description: string;
  labelIds?: string[];
  labelNames?: string[];
}

/**
 * DTO pour répondre avec une todo.
 */
export interface TodoResponseDto {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  labels: Array<{ id: string; name: string; color: string }>;
  createdAt: string;
  updatedAt: string;
}
