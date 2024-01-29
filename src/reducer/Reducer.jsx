/** @format */
import { v4 as uuidv4 } from "uuid";
export default function TaskReducer(currentTodos, { type, payload }) {
  switch (type) {
    case "added": {
      const newtask = {
        id: uuidv4(),
        title: payload.title,
        details: "",
        IsCompleted: false,
      };
      const newTasksList = [...currentTodos, newtask];
      localStorage.setItem("task", JSON.stringify(newTasksList));
      return newTasksList;
    }
    case "deleted": {
      const newTasksList = currentTodos.filter((task) => {
        return task.id != payload.targetId;
      });
      localStorage.setItem("task", JSON.stringify(newTasksList));
      return newTasksList;
    }
    case "edited": {
      const newTasksList = currentTodos.map((task) => {
        if (task.id == payload.targetTask.id) {
          return {
            ...task,
            title: payload.targetTask.title,
            details: payload.targetTask.details,
          };
        } else {
          return task;
        }
      });
      localStorage.setItem("task", JSON.stringify(newTasksList));

      return newTasksList;
    }
    case "get": {
      const storgeData = JSON.parse(window.localStorage.getItem("task")) ?? [];
      return storgeData;
    }
    case "checked": {
      const newTasksList = currentTodos.map((task) => {
        if (task.id === payload.targetId) {
          return { ...task, IsCompleted: ! task.IsCompleted };
        }
        return task;
      });
      window.localStorage.setItem("task", JSON.stringify(newTasksList));
      return newTasksList;
    }
  }
}
