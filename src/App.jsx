/** @format */

import { ThemeProvider } from "@emotion/react";
import "./App.css";
import TodoLists from "./components/TodoList";
import { createTheme } from "@mui/material";
import SnackbarModal from "./components/Snackbar";
import { ToastProvider } from "./context/ToastContext";
import { TasksProvider } from "./context/Context";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"],
  },
  palette: {
    primary: {
      main: "#303f9f",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <TasksProvider>
        <ToastProvider>
          <div
            className="app"
            style={{
              background: "black",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TodoLists />
          </div>
        </ToastProvider>
      </TasksProvider>
      <SnackbarModal />
    </ThemeProvider>
  );
}

export default App;
