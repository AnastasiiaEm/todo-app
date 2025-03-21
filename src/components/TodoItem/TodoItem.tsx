import { Dispatch, useContext } from "react";
import { Todo } from "../../types/Todo"
import { TodosContext } from "../../store/TodoContext";
import { Action, State } from "../../types/Context";
import { Reorder } from "framer-motion";
import './TodoItem.scss'
import cn from 'classnames';

type Props = {
  todo: Todo,
}

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const { id, title, completed} = todo;
  const [, dispatch]
  = useContext(TodosContext) as [State, Dispatch<Action>];

  const toggleCompletedHandler = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  };

  const removeTodoHandler = () => {
    dispatch( { type: 'REMOVE_TASK', payload: todo.id })
  }

  return (
    <Reorder.Item key={id} value={todo}>
      <div className={cn('item', {
      completed,
    })}>
        <input 
          type="checkbox"
          checked={completed}
          onChange={toggleCompletedHandler}
          id={`toggle-${id}`}
          className="item__toggle"
        />
        <label htmlFor={`toggle-${id}`} className="item__toggle-label"></label>

        <span>{title}</span>
        <button 
          type="button"
          onClick={removeTodoHandler}
          className="item__delete-btn"
        ><span className="item__delete-icon"></span></button>
      </div>
    </Reorder.Item>
  )
}