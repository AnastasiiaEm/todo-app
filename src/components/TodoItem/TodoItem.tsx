import { Dispatch, useContext } from "react";
import { Todo } from "../../types/Todo"
import { TodosContext } from "../../store/TodoContext";
import { Action, State } from "../../types/Context";

type Props = {
  todo: Todo,
}

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const { title, completed} = todo;
  const [, dispatch]
  = useContext(TodosContext) as [State, Dispatch<Action>];

  const toggleCompletedHandler = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  };

  const removeTodoHandler = () => {
    dispatch( { type: 'REMOVE_TASK', payload: todo.id })
  }

  return (
    <li>
      <div>
        <input 
          type="checkbox"
          checked={completed}
          onChange={toggleCompletedHandler}
        />

        {title}

        <button 
          type="button"
          onClick={removeTodoHandler}
        >X</button>
      </div>

    </li>
  )
}