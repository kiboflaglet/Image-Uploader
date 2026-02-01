import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type ToDo = {
  id: number;
  title: string;
  done: boolean;
};

const ToDoData: ToDo[] = [];

const toDoSlice = createSlice({
  name: "todo",
  initialState: ToDoData,
  reducers: {
    updateStatus: (
      state,
      action: PayloadAction<{ id: number; done: boolean }>
    ) => {
      const task = state.find((item) => item.id === action.payload.id);
      if (!task) return;
      task.done = action.payload.done;
    },
    clearCompleted: (state) => {
      return state.filter((item) => item.done === false);
    },
    createToDo: (state, action: PayloadAction<{ title: string }>) => {
      state.push({
        id: state.length + 1,
        title: action.payload.title,
        done: false,
      });
    },
  },
});

export const toDosSelect = (state: RootState) => state.toDoReducer;
export const toDosCompletedSelect = (state: RootState) =>
  state.toDoReducer.filter((item) => item.done === true);
export const toDosActiveSelect = (state: RootState) =>
  state.toDoReducer.filter((item) => item.done === false);

export const { updateStatus, clearCompleted, createToDo } = toDoSlice.actions;
export const toDoReducer = toDoSlice.reducer;
