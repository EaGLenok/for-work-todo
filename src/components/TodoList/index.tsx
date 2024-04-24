import React, { useState } from "react";
import s from "./TodoList.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import TodoItem from "../TodoItem";
import { useLocation } from "react-router-dom";
import { updateTodoList } from "../../redux/slices/todoSlice";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allTodos, deletedTodos } = useAppSelector((state) => state.todos);
  const location = useLocation();
  const isDeletedPage = location.pathname === "/deleted";
  const [draggedItem, setDraggedItem] = useState<Todo | null>(null);

  const handleDragStart = (todo: Todo) => {
    setDraggedItem(todo);
  };

  const handleDrop = (todo: Todo) => {
    if (draggedItem && draggedItem.id !== todo.id) {
      const newList = allTodos.filter((item) => item.id !== draggedItem.id);
      const dropIndex = newList.findIndex((item) => item.id === todo.id);
      newList.splice(dropIndex + 1, 0, draggedItem);
      dispatch(updateTodoList(newList));
    }
    setDraggedItem(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className={s.todo_list_items}>
        {isDeletedPage ? (
          deletedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          ))
        ) : (
          <>
            {allTodos.map((todo) => (
              <div
                key={todo.id}
                draggable
                onDragStart={() => handleDragStart(todo)}
                onDrop={() => handleDrop(todo)}
                onDragOver={handleDragOver}
              >
                <TodoItem
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                />
              </div>
            ))}
            <h2>Видалені ↓</h2>
            {deletedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;
