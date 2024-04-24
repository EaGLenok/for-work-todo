import React from "react";
import s from "./TodoItem.module.scss";
import { deleteTodo } from "../../redux/slices/todoSlice";
import { useAppDispatch } from "../../redux/hooks";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className={s.todo_item}>
        <div className={s.task_information}>
          <h3>{title}</h3>
        </div>
        <div className={s.task_actions}>
          <button onClick={() => dispatch(deleteTodo(id))}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
