import React from "react";
import s from "./TodoBlock.module.scss";
import TodoList from "../TodoList";
import { useAppDispatch } from "../../redux/hooks";
import { addTodo } from "../../redux/slices/todoSlice";
import { Link } from "react-router-dom";

const TodoBlock: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const [todoActivePage, setTodoActivePage] = React.useState<string>("usual");
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value.trim()) {
      dispatch(addTodo({ title: value, completed: false }));
      setValue("");
    }
  };

  return (
    <div className={s.todo_block}>
      <div className={s.link_container}>
        <Link
          onClick={() => setTodoActivePage("usual")}
          className={`${s.links} ${todoActivePage === "usual" && s.active}`}
          to={"/"}
        >
          Всі
        </Link>
        <Link
          onClick={() => setTodoActivePage("deleted")}
          className={`${s.links} ${todoActivePage === "deleted" && s.active}`}
          to={"/deleted"}
        >
          Видалені
        </Link>
      </div>
      <div className={s.input_container}>
        <input
          value={value}
          onChange={handleInputChange}
          className={s.todo_input}
          type="text"
          placeholder="Enter a new todo"
        />
        <button onClick={handleSubmit} className={s.submit_button}>
          Add Todo
        </button>
      </div>
      <div className={s.todo_content}>
        <TodoList />
      </div>
    </div>
  );
};

export default TodoBlock;
