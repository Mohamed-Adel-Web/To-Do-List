/** @format */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { useTask } from "../context/Context";
import { ToastContext } from "../context/ToastContext";
export default function Todo({
  task,
  cat,
  handleDeleteModalOpen,
  handleEditModalOpen,
}) {
  const { handleToast } = useContext(ToastContext);
  const { tasks, dispatch } = useTask();
  function handleCheck(id) {
    dispatch({ type: "checked", payload: { targetId: id } });
    handleToast("Task state edited successfully", "success");
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          background: "#1a237e",
          color: "white",
          marginTop: "2rem",
        }}
        className="to-do"
        style={{
          display:
            cat === "all" ||
            (task.IsCompleted && cat === "completed") ||
            (!task.IsCompleted && cat === "incomplete")
              ? "block"
              : "none",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                style={{
                  textDecoration: task.IsCompleted ? "line-through" : "none",
                }}
                variant="h5"
              >
                {task.title}
              </Typography>
              <Typography style={{ color: "#9e9e9e" }}>
                {task.details}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                className="icon"
                aria-label="check"
                style={{
                  background: !task.IsCompleted ? "white" : "#8bc34a",
                  color: !task.IsCompleted ? "#8bc34a" : "white",
                  border: "1px solid #8bc34a ",
                }}
                onClick={() => {
                  handleCheck(task.id);
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="icon"
                aria-label="edit"
                style={{
                  background: "white",
                  color: "#0d47a1",
                  border: "1px solid #0d47a1",
                }}
                onClick={() => {
                  handleEditModalOpen(task);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="icon"
                aria-label="delete"
                style={{
                  background: "white",
                  color: "#d50000",
                  border: "1px solid #d50000",
                }}
                onClick={() => {
                  handleDeleteModalOpen(task);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
