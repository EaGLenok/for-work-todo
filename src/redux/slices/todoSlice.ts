import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  lastId: number;
  allTodos: Todo[];
  deletedTodos: Todo[];
}

const initialState: TodosState = {
  lastId: 0,
  allTodos: [],
  deletedTodos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ title: string; completed: boolean }>
    ) => {
      const newId = state.lastId + 1;
      state.allTodos.push({ id: newId, ...action.payload });
      state.lastId = newId;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.allTodos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (index !== -1) {
        state.deletedTodos.push(state.allTodos[index]);
        state.allTodos.splice(index, 1);
      }
    },
    updateTodoList: (state, action: PayloadAction<Todo[]>) => {
      state.allTodos = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodoList } = todosSlice.actions;

export default todosSlice.reducer;
