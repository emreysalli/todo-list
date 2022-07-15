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
import Badge from "@mui/material/Badge";
import TaskIcon from "@mui/icons-material/Task";
import Pagination from "@mui/material/Pagination";
import usePagination from "./Pagination";
function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [priority, setPriority] = useState("");
  const [openDialog, setOpenDialog] = useState([false, ""]);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const count = Math.ceil(filteredTask.length / perPage);
  const _data = usePagination(filteredTask, perPage);
  const handleChangePage = (e, p) => {
    setPage(p);
    _data.jump(p);
  };

  const priorityObj = {
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
    let taskObj = {
      id: uuid(),
      text: task,
      isComplete: false,
      taskPriority: priority,
    };
    setTaskItems([...taskItems, taskObj]);
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

  const filterTask = (task) => {
    return task.id === openDialog[1];
  };

  return (
    <div className="App">
      {openDialog[0] && (
        <TaskEditDialog
          open={openDialog}
          setOpen={setOpenDialog}
          priorityObj={priorityObj}
          task={filteredTask.filter(filterTask)}
          taskItems={taskItems}
          setTaskItems={setTaskItems}
        />
      )}
      <h2 className="sectionTitle"> TODO LIST </h2>
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
            id="outlined-required"
            label="Task"
            value={task}
            variant="outlined"
            helperText="Please write a task"
            onChange={(event) => setTask(event.target.value)}
          />
          <PrioritySelect
            priorityObj={priorityObj}
            handleChange={handleChange}
            priority={priority}
          />
          <Button type="submit" id="addBtn" variant="outlined">
            +
          </Button>
        </div>
      </Box>
      <div
        style={{
          margin: 20,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Badge
          color="secondary"
          badgeContent={filteredTask.length}
          style={{ marginRight: 10 }}
        >
          <TaskIcon fontSize="large" color="action" />
        </Badge>
        <FilterButtonGroup
          filtered={filtered}
          clearCompleted={clearCompleted}
        />
      </div>

      {_data.currentData().map((item, index) => {
        return (
          <Task
            key={index}
            item={item}
            index={(_data.currentPage - 1) * 5 + index}
            priorityObj={priorityObj}
            setOpenDialog={setOpenDialog}
            completedTask={completedTask}
            deleteTask={deleteTask}
          />
        );
      })}
      <Pagination
        id="pagination"
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
      />
    </div>
  );
}
export default App;
