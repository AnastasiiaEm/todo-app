import { Dispatch, useContext } from "react";
import { Action, Filter, State } from "../../types/Context";
import { TodosContext } from "../../store/TodoContext";
import "./TodoFilters.scss";

export const TodoFilters: React.FC = () => {
  const [{ filter }, dispatch] = useContext(TodosContext) as [State, Dispatch<Action>];

  const getSelectedClass = (filterName: string) => {
    return filter === filterName ? 'filters__filter selected' : 'filters__filter';
  };

  const changeFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filterName: Filter
  ) => {
    event.preventDefault();
    dispatch({ type: "CHANGE_FILTER", payload: filterName });
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={(event) => changeFilter(event, "ALL")}
          className={getSelectedClass('ALL')}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          onClick={(event) => changeFilter(event, "ACTIVE")}
          className={getSelectedClass('ACTIVE')}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          onClick={(event) => changeFilter(event, "COMPLETED")}
          className={getSelectedClass('COMPLETED')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
