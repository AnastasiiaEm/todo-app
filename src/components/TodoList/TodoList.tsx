import { Dispatch, useContext } from "react";
import { Todo } from "../../types/Todo";
import { TodoItem } from "../TodoItem/TodoItem";
import { Reorder } from "framer-motion";
import { TodosContext } from "../../store/TodoContext";
import { Action, State } from "../../types/Context";

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos}) => {
  const [, dispatch] = useContext(TodosContext) as [State, Dispatch<Action>];

  const handleReorder = (newOrder: Todo[]) => {
    dispatch({ type: 'REORDER_TASKS', payload: newOrder });
  };

  return (
    <Reorder.Group 
      values={todos}
      onReorder={handleReorder}
    >
      {todos.map(todo => (
      <Reorder.Item key={todo.id} value={todo}>
        <TodoItem todo={todo} />
      </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}