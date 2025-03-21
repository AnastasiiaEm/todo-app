import { Dispatch, useContext } from "react";
import { Todo } from "../../types/Todo";
import { TodoItem } from "../TodoItem/TodoItem";
import { Reorder } from "framer-motion";
import { TodosContext } from "../../store/TodoContext";
import { Action, State } from "../../types/Context";
import './TodoList.scss';

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
      className="list"
    >
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id}/>
      ))}
    </Reorder.Group>
  )
}