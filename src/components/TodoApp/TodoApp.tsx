import { Dispatch, useContext, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import { TodoFilters } from "../TodoFilters/TodoFilters";
import { TodosContext } from "../../store/TodoContext";
import { Action, State } from "../../types/Context";

export const TodoApp: React.FC= () => {
  const [state, dispatch]
  = useContext(TodosContext) as [State, Dispatch<Action>];
  const { todos } = state;
  const [todoText, setTodoText] = useState('');
  const activeCount = todos.filter(todo => !todo.completed).length;
  const itemsLeftText = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
  const someTodosCompleted = todos.some(todo => todo.completed);
  const areAllTodosChecked = todos.every(todo => todo.completed);

  const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const addTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newText = todoText.trim();
    const textIsValid = todoText.trim().length > 0;

    if (textIsValid) {
      setTodoText('');
      dispatch({ type: 'ADD_TASK', payload: newText });
    }
  };

  const clearCompletedTodosHandler = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const toggleAllTodosHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: 'TOGGLE_ALL', payload: event.target.checked})
  }

  return (
    <div>
      <header>
        <div>
          <h1>todo</h1>
          {/* TODO add icon */}
        </div>

        <form onSubmit={addTodoHandler} onBlur={addTodoHandler}>
          <input 
            type="text"
            placeholder="Create a new todo..."
            value={todoText}
            onChange={changeTextHandler}
            />
        </form>
      </header>

      <section>
        <input 
          type="checkbox"
          id="toggle-all"
          checked={areAllTodosChecked}
          onChange={toggleAllTodosHandler}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todos={todos}/>
      </section>

      <footer>
        <span>{itemsLeftText}</span>

        <TodoFilters />

        {someTodosCompleted && (
        <button
          type="button"
          onClick={clearCompletedTodosHandler}
        >
          Clear completed
        </button>
        )}

      </footer>
    </div>
  )
}