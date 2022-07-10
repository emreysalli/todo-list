import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./App.css";
import Task from "./components/Task/Task.jsx";
import TaskEditDialog from "./components/TaskEditDialog/TaskEditDialog.jsx";
import FilterButtonGroup from "./components/FilterButtonGroup/FilterButtonGroup.jsx";
import PrioritySelect from "./components/PrioritySelect/PrioritySelect.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [priority, setPriority] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const priorityDict = {
    Low: "green",
    Medium: "yellow",
    High: "orange",
    Immediately: "red",
  };

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    let taskDict = {
      id: uuid(),
      text: task,
      isComplete: false,
      taskPriority: priority,
    };
    setTaskItems([...taskItems, taskDict]);
    setPriority("");
    setTask("");
  };

  const completedTask = (id) => {
    let itemsCopy = [...taskItems];
    let index = itemsCopy.findIndex((item) => item.id === id);

    itemsCopy[index].isComplete = !itemsCopy[index].isComplete;

    setTaskItems(itemsCopy);
  };

  const deleteTask = (id) => {
    let itemsCopy = [...taskItems];
    let index = itemsCopy.findIndex((item) => item.id === id);
    itemsCopy.splice(index, 1);

    setTaskItems(itemsCopy);
  };

  const filtered = (complete) => {
    if (complete === null) {
      setFilteredTask(taskItems);
      return;
    }

    let filtered = taskItems.filter((item) => {
      return item.isComplete === complete;
    });

    setFilteredTask(filtered);
  };

  useEffect(() => {
    let filtered = taskItems.filter((item) => {
      return item.isComplete === true;
    });

    if (filtered.length === 0) {
      document.querySelector(".clearCompBtn").style.display = "none";
    } else {
      document.querySelector(".clearCompBtn").style.display = "inline-block";
    }

    setFilteredTask(taskItems);
  }, [taskItems]);

  const clearCompleted = () => {
    let filtered = taskItems.filter((item) => {
      return item.isComplete === false;
    });

    setTaskItems(filtered);
  };

  return (
    <div className="App">
      {openDialog && (
        <TaskEditDialog
          open={openDialog}
          setOpen={setOpenDialog}
          priorityObj={priorityDict}
        />
      )}

      <h2 className="sectionTitle">TODO LIST</h2>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
        onSubmit={handleAddTask}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <TextField
            required
            autoFocus
            className="input"
            id="outlined-required"
            label="Task"
            value={task}
            variant="outlined"
            helperText="Please write a task"
            onChange={(event) => setTask(event.target.value)}
          />
          <PrioritySelect
            priorityDict={priorityDict}
            handleChange={handleChange}
            priority={priority}
          />
          <Button type="submit" variant="outlined">
            +
          </Button>
        </div>
      </Box>
      <FilterButtonGroup filtered={filtered} clearCompleted={clearCompleted} />

      {filteredTask.map((item, index) => {
        return (
          <Task
            item={item}
            id={index}
            priorityDict={priorityDict}
            setOpenDialog={setOpenDialog}
            completedTask={completedTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
}
export default App;