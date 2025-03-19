import { useState } from "react";

export const TodoApp: React.FC= () => {
  const [todoText, setTodoText] = useState('');

  const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const addTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // const newText = todoText.trim();
    const textIsValid = todoText.trim().length > 0;

    if (textIsValid) {
      setTodoText('');
    }
  }

  return (
    <div className="todoapp">
      <header className="header">
        <div>
          <h1>todo</h1>
          {/* TODO add icon */}
        </div>

        <form onSubmit={addTodoHandler} onBlur={addTodoHandler}>
          <input 
            type="text"
            className="new-todo"
            placeholder="Create a new todo..."
            value={todoText}
            onChange={changeTextHandler}
            />
        </form>
      </header>
    </div>
  )
}