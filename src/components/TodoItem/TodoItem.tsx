import { Todo } from "../../types/Todo"

type Props = {
  todo: Todo,
}

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const { title } = todo;
  return (
    <li>
      {title}
    </li>
  )
}