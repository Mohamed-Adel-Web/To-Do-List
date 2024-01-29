/** @format */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Todo from "./Todo";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState, useContext} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../context/ToastContext";
import { useTask } from "../context/Context";
export default function TodoLists() {
  const [alignment, setAlignment] = useState("all");
  const [deletedTask, setDeletedTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const { handleToast } = useContext(ToastContext);
  const [inputValue, setInput] = useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const { tasks, dispatch } = useTask();
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);
  function handleAdd() {
    if (inputValue != "") {
      dispatch({ type: "added", payload: { title: inputValue } });
      setInput("");
      handleToast("Task added successfully", "success");
    }
  }
  function handleDeleteModalOpen(task) {
    setOpen(true);
    setDeletedTask(task);
  }

  const handleDeleteModalClose = () => {
    setOpen(false);
  };
  function handleEditModalOpen(task) {
    setEditOpen(true);
    setEditTask(task);
  }
  const handleEditModalClose = () => {
    setEditOpen(false);
  };
  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: { targetId: deletedTask.id } });
    handleToast("Task deleted successfully", "error");
  }
  function handleEditConfirm() {
    dispatch({ type: "edited", payload: { targetTask: editTask } });

    handleToast("Task edited successfully", "info");
  }
  const tasksList = tasks.map((task) => {
    return (
      <Todo
        key={task.id}
        task={task}
        cat={alignment}
        handleDeleteModalOpen={handleDeleteModalOpen}
        handleEditModalOpen={handleEditModalOpen}
      />
    );
  });
  return (
    <>
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography
              variant="h3"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              My Tasks
              <Divider />
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton style={{ fontWeight: "bold" }} value="all">
                  All
                </ToggleButton>
                <ToggleButton style={{ fontWeight: "bold" }} value="completed">
                  Completed
                </ToggleButton>
                <ToggleButton style={{ fontWeight: "bold" }} value="incomplete">
                  inComplete
                </ToggleButton>
              </ToggleButtonGroup>
            </Typography>
            {tasksList}
            <Grid
              container
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-around",
              }}
              spacing={2}
            >
              <Grid xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Task title"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={inputValue}
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <Button
                  style={{
                    width: "100%",
                    height: "100%",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                  variant="contained"
                  onClick={handleAdd}
                >
                  ADD
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
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
              handleDeleteConfirm();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
          <TextField
            id="standard-basic"
            label="Task title"
            variant="standard"
            fullWidth
            value={editTask.title}
            onChange={(event) => {
              setEditTask({ ...editTask, title: event.target.value });
            }}
          />
          <TextField
            id="standard-basic"
            label="task details"
            variant="standard"
            fullWidth
            sx={{ mt: 2 }}
            value={editTask.details}
            onChange={(event) => {
              setEditTask({ ...editTask, details: event.target.value });
            }}
          />
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
              handleEditConfirm();
            }}
            autoFocus
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
