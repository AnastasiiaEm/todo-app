import { useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import { Todo } from "../../types/Todo";
import { TodoFilters } from "../TodoFilters/TodoFilters";

export const TodoApp: React.FC= () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const activeCount = todos.filter(todo => !todo.completed).length;
  const itemsLeftText = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
  const someTodosCompleted = todos.some(todo => todo.completed);

  const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const addTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newText = todoText.trim();
    const textIsValid = todoText.trim().length > 0;

    if (textIsValid) {
      setTodoText('');
      addNewTodo(newText)
    }
  }

  const addNewTodo = (newText: string) => {
    const newTask = {
      id: +new Date(),
      title: newText,
      completed: false,
    };

    setTodos([...todos, newTask])
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
        <TodoList todos={todos}/>
      </section>

      <footer>
        <span>{itemsLeftText}</span>

        <TodoFilters />

        {someTodosCompleted && (
        <button
          type="button"
        >
          Clear completed
        </button>
        )}

      </footer>
    </div>
  )
}