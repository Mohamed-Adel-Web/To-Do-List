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
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TasksContext } from "../context/Context";
export default function TodoLists() {
  const [alignment, setAlignment] = useState("all");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [inputValue, setInput] = useState("");
  const { tasks, setTask } = useContext(TasksContext);
  useEffect(() => {
    const storgeData = JSON.parse(window.localStorage.getItem("task")) ?? [];
    setTask(storgeData);
  }, []);
  function handleAdd() {
    if (inputValue != "") {
      const newtask = {
        id: uuidv4(),
        title: inputValue,
        details: "",
        IsCompleted: false,
      };
      const newTasksList = [...tasks, newtask];
      setTask(newTasksList);

      localStorage.setItem("task", JSON.stringify(newTasksList));
      setInput("")
    }
  }
  const tasksList = tasks.map((task) => {
    return <Todo key={task.id} task={task} cat={alignment} />;
  });
  return (
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
  );
}
