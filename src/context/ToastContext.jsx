/** @format */

import { createContext, useState } from "react";
import SnackbarModal from "../components/Snackbar";
export const ToastContext = createContext("");

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [ alertMessage, setMessage ] = useState("");
  const [ alertColor, setColor ] = useState("");
  function handleToast(newMessage, newColor) {
    setOpen(true);
    setMessage(newMessage);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setColor(newColor);
  }
  return (
    <>
      <ToastContext.Provider value={{ handleToast }}>
        <SnackbarModal open={open} message={alertMessage} color={alertColor} />
        {children}
      </ToastContext.Provider>
    </>
  );
}
