import { Dispatch, useContext } from "react";
import { Action, Filter, State } from "../../types/Context";
import { TodosContext } from "../../store/TodoContext";

export const TodoFilters: React.FC = () => {
  const [,dispatch]
  = useContext(TodosContext) as [State, Dispatch<Action>];

  const changeFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, 
    filterName: Filter
  ) => {
    event.preventDefault();
    dispatch({ type: 'CHANGE_FILTER', payload: filterName });
  }

  return (
    <ul>
      <li>
        <a href="#/" onClick={(event) => changeFilter(event, "ALL")}>
          All
        </a>
      </li>
      <li>
        <a href="#/active" onClick={(event) => changeFilter(event, "ACTIVE")}>
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          onClick={(event) => changeFilter(event, "COMPLETED")}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
