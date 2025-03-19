import { Todo } from "../../types/Todo";
import { TodoItem } from "../TodoItem/TodoItem";

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos}) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  )
}