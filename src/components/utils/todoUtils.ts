import { Filter } from "../../types/Context";
import { Todo } from "../../types/Todo";

export const getVisibleTodos = (filter: Filter, todos: Todo[]) => {
  if (filter === 'ACTIVE') {
    return todos.filter(todo => !todo.completed);
  }

  if (filter === 'COMPLETED') {
    return todos.filter(todo => todo.completed);
  }

  return todos;
};