import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import Logo from "./assets/logo-small.svg";
import Moon from "./assets/Moon_fill.svg";
import Sun from "./assets/Sun_fill.svg";
import { changeTheme } from "./features/theme/theme.slice";
import type { AppDispatch, RootState } from "./store";

const App = () => {
  const theme = useSelector((state: RootState) => state.themeReducer);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="h-screen">
      <div className="flex justify-between border-b border-main-1 p-5 bg-main-3">
        <div className="flex w-full items-center gap-2 font-bold ">
          <img className="p-0 m-0" src={Logo} />
          <span>Image Upload</span>
        </div>
        <div>
          <button
            className="p-2 border rounded-xl m-0 border-main-1 bg-main-2"
            onClick={() => {
              dispatch(
                changeTheme({
                  theme: theme.theme === "dark" ? "light" : "dark",
                })
              );
            }}
          >
            {theme.theme === "dark" ? <img src={Sun} /> : <img src={Moon} />}
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
