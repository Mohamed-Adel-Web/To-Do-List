/** @format */

import { createContext, useContext } from "react";
import { useReducer } from "react";
export const TasksContext = createContext();
import TaskReducer from "../reducer/Reducer";
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(TaskReducer, []);
  return (
    <TasksContext.Provider value={{ tasks: tasks, dispatch: dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}
export  const useTask = () => {
 return useContext(TasksContext);
};
