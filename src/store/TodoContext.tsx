import { createContext, Dispatch, useReducer } from "react"
import { Action, Filter, State } from "../types/Context";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Todo } from "../types/Todo";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTask],
      }
    }

    case "REMOVE_TASK": {
      const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case "TOGGLE_ALL": {
      const updatedTodos = state.todos.map((todo) => ({
        ...todo,
        completed: action.payload,
      }));

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case "CHANGE_FILTER": {
      return {
        ...state,
        filter: action.payload,
      };
    }

    case "CLEAR_COMPLETED": {
      const updatedTodos = state.todos.filter(todo => !todo.completed);

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case 'REORDER_TASKS': {
      return {
        ...state,
        todos: action.payload,
      };
    }

    default:
      return state;
  }
}

const initialState = {
  todos: [],
  filter: 'ALL' as Filter,
}

export const TodosContext = createContext<[State, Dispatch<Action>] | undefined>(undefined);

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [initialValue, save] = useLocalStorage(
    'todos', [] as Todo[],
  );

  const stateWithLocalStorage = {
    ...initialState,
    todos: initialValue,
    onSave: save,
  };

  const value = useReducer(
    reducer, stateWithLocalStorage,
  );

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
}