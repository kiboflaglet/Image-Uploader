import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeType = {
  theme: "light" | "dark";
};

const initialState: ThemeType = {
  theme: (() => {
    if (window === undefined) return "light";
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  })(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload.theme;
      if (window ) {
        document.documentElement.setAttribute("data-theme", action.payload.theme)
        localStorage.setItem("theme", action.payload.theme)
      }
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
