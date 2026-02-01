import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./features/theme/theme.slice";
import { toDoReducer } from "./features/todo/todo.slice";

export const store = configureStore({
    reducer: {
        themeReducer,
        toDoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
