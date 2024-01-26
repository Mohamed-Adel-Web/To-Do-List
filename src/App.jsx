/** @format */

import { ThemeProvider } from "@emotion/react";
import "./App.css";
import TodoLists from "./components/TodoList";
import { TasksContext } from "./context/Context";
import { useState } from "react";
import { createTheme } from "@mui/material";
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
  const [tasks, setTask] = useState([]);
  return (
    <ThemeProvider theme={theme}>
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
        <TasksContext.Provider value={{tasks, setTask}}>
          <TodoLists />
        </TasksContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
