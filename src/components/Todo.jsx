/** @format */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { TasksContext } from "../context/Context";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
export default function Todo({ task, cat }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const [editInput, setEditInput] = useState({
    title: task.title,
    details: task.details,
  });
  const handleDeletModalOpen = () => {
    setOpen(true);
  };

  const handleDeleteModalClose = () => {
    setOpen(false);
  };
  const handleEditModalOpen = () => {
    setEditOpen(true);
  };

  const handleEditModalClose = () => {
    setEditOpen(false);
  };

  const {tasks, setTask} = useContext(TasksContext);
  function handleCheck(id) {
    const newTasksList = tasks.map((task) => {
      if (task.id === id) {
        task.IsCompleted = !task.IsCompleted;
      }
      return task;
    });
    setTask(newTasksList);
    window.localStorage.setItem("task",JSON.stringify(newTasksList))
  }
  function handleDeleteConfirm(id) {
    const newTasksList = tasks.filter((task) => {
      return task.id != id;
    });
    setTask(newTasksList);
    localStorage.setItem("task", JSON.stringify(newTasksList));
  }
  function handleEditConfirm(id) {
    const newTasksList = tasks.map((task) => {
      if (task.id == id) {
        return { ...task, title: editInput.title, details: editInput.details };
      } else {
        return task;
      }
    });
    setTask(newTasksList);
    localStorage.setItem("task", JSON.stringify(newTasksList));
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
              <Typography style={{textDecoration: task.IsCompleted?"line-through":"none"}} variant="h5">{task.title}</Typography>
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
                  handleEditModalOpen();
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
                  handleDeletModalOpen();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* delete modal */}
      <Dialog
        open={open}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ color: "#d50000" }}
      >
        <DialogTitle
          id="alert-dialog-titles"
          style={{ fontWeight: "bold", color: "#b71c1c" }}
        >
          Delete Task
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete This Task ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "#b71c1c", fontWeight: "bold" }}
            onClick={handleDeleteModalClose}
          >
            Cancel
          </Button>
          <Button
            style={{ color: "#b71c1c", fontWeight: "bold" }}
            onClick={() => {
              handleDeleteModalClose();
              handleDeleteConfirm(task.id);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete modal */}
      {/* edit modal */}
      <Dialog
        open={openEdit}
        onClose={handleEditModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ color: "#d50000" }}
      >
        <DialogTitle
          id="alert-dialog-titles"
          style={{ fontWeight: "bold", color: "#1a237e" }}
        >
          Edit Task
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              id="standard-basic"
              label="Task title"
              variant="standard"
              fullWidth
              value={editInput.title}
              onChange={(event) => {
                setEditInput({ ...editInput, title: event.target.value });
              }}
            />
            <TextField
              id="standard-basic"
              label="task details"
              variant="standard"
              fullWidth
              sx={{ mt: 2 }}
              value={editInput.details}
              onChange={(event) => {
                setEditInput({ ...editInput, details: event.target.value });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "#1a237e", fontWeight: "bold" }}
            onClick={handleEditModalClose}
          >
            Cancel
          </Button>
          <Button
            style={{ color: "#1a237e", fontWeight: "bold" }}
            onClick={() => {
              handleEditModalClose();
              handleEditConfirm(task.id);
            }}
            autoFocus
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* edit modal */}
    </>
  );
}
