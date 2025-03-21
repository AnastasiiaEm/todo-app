import { Dispatch, useContext, useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import { TodoFilters } from "../TodoFilters/TodoFilters";
import { TodosContext } from "../../store/TodoContext";
import { Action, State } from "../../types/Context";
import { getVisibleTodos } from "../utils/todoUtils";
import './TodoApp.scss'

export const TodoApp: React.FC= () => {
  const [state, dispatch]
  = useContext(TodosContext) as [State, Dispatch<Action>];
  const { todos, filter } = state;
  const [todoText, setTodoText] = useState('');
  const activeCount = todos.filter(todo => !todo.completed).length;
  const itemsLeftText = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
  const someTodosCompleted = todos.some(todo => todo.completed);
  const areAllTodosChecked = todos.every(todo => todo.completed);

  const visibleTodos = getVisibleTodos(filter, todos);

  useEffect(() => {
    if (state.onSave) {
      state.onSave(todos);
    }
  }, [state, todos]);

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
    <div className="todo-app">
      <header className="todo-app__header">
        <div className="todo-app__header-top">
          <h1 className="todo-app__title">todo</h1>
          <button className="todo-app__theme-switch-btn">
            <span className="todo-app__theme-switch-icon"></span>
          </button>
        </div>

        <form 
          onSubmit={addTodoHandler} 
          onBlur={addTodoHandler}>
          <input 
            type="text"
            placeholder="Create a new todo..."
            value={todoText}
            onChange={changeTextHandler}
            name="newTodo"
            className="todo-app__new-todo"
            />
        </form>
      </header>

      <section className="todo-app__main">
        <input 
          type="checkbox"
          id="toggle-all"
          checked={areAllTodosChecked}
          onChange={toggleAllTodosHandler}
          className="todo-app__toggle-all"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todos={visibleTodos}/>
      </section>

      <footer>
        <div className="todo-app__footer">
          <span>{itemsLeftText}</span>


          <div className="todo-app__filters todo-app__filters--desktop">
            <TodoFilters />
          </div>

          <button
            type="button"
            onClick={clearCompletedTodosHandler}
            className={`todo-app__clear-completed-btn ${someTodosCompleted ? "visible" : ""}`}
            >
            Clear completed
          </button>
        </div>

        <div className="todo-app__filters todo-app__filters--mobile">
          <TodoFilters />
        </div>
      </footer>
      
      <section className="todo-app__information">
        <p>Drag and drop to reorder list</p>
      </section>
    </div>
  )
}