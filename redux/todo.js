import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    setTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    delTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos.map((t) => {
        if (t._id === action.payload._id) {
          t.content = action.payload?.content;
          t.date = action.payload?.date;
          t.status = action.payload?.status;
          return;
        }
      });
    },
    updateStatus: (state, action) => {
      state.todos.map((t) => {
        if (t._id === action.payload) {
          t.status = !t.status;
          return;
        }
      });
    },
    initTodo: (state, action) => {
      state.todos = [];
      action.payload.forEach((element) => {
        state.todos.push(element);
      });
    },
  },
});

export const { setTodo, delTodo, updateTodo, updateStatus, initTodo } =
  slice.actions;
export default slice.reducer;
