import React, { useState, useEffect } from "react";
import "./App.css";
import { Task } from "./components/Task.js";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

function App() {
  //css
  const sectionTitle = {
    fontSize: 36,
    fontWeight: "bold",
  };
  const input = {
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
    height: 40,
    fontSize: "16px",
  };
  const addWrapper = {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    margin: "5px",
    fontSize: "24px",
  };

  document.title = "TODO LIST";
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [priority, setPriority] = useState("");
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
    if (task !== "") {
      let taskDict = { text: task, isComplete: false, taskPriority: priority };
      setTaskItems([...taskItems, taskDict]);
      setPriority("");
      setTask("");
    }
  };

  const completedTask = (index) => {
    let itemsCopy = [...taskItems];

    itemsCopy[index].isComplete = !itemsCopy[index].isComplete;

    setTaskItems(itemsCopy);
  };

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const filtered = (complete) => {
    if (complete === null) {
      setFilteredTask(taskItems);
      return;
    }

    const filtered = taskItems.filter((item) => {
      return item.isComplete === complete;
    });

    setFilteredTask(filtered);
  };

  useEffect(() => {
    setFilteredTask(taskItems);
  }, [taskItems]);

  return (
    <div className="App">
      <h2 style={sectionTitle}>TODO LIST</h2>
      <form onSubmit={handleAddTask}>
        <input
          style={input}
          placeholder={"  Write a task"}
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button type="submit" style={addWrapper}>
          +
        </button>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={priority}
          onChange={handleChange}
          label="Priority"
        >
          {Object.keys(priorityDict).map(function (key, index) {
            return (
              <MenuItem value={key} key={index}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </form>
      <ButtonGroup
        className="filterBtnGroup"
        size="medium"
        variant="outlined"
        exclusive
        aria-label="outlined button group"
      >
        <Button
          style={{ color: "black", borderColor: "black" }}
          className="filterBtn"
          onClick={() => filtered(null)}
        >
          All
        </Button>
        <Button
          style={{ color: "black", borderColor: "black" }}
          className="filterBtn"
          onClick={() => filtered(false)}
        >
          Active
        </Button>
        <Button
          style={{ color: "black", borderColor: "black" }}
          className="filterBtn"
          onClick={() => filtered(true)}
        >
          Completed
        </Button>
      </ButtonGroup>

      {filteredTask.map((item, index) => {
        return (
          <div
            style={{
              backgroundColor: priorityDict[item.taskPriority],
            }}
            className="itemBox"
            key={index}
            id={index}
          >
            <Task text={item.text} id={index} complete={item.isComplete} />
            <div className="buttons">
              <IconButton
                aria-label="delete"
                type="submit"
                onClick={() => completedTask(index)}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                type="submit"
                onClick={() => deleteTask(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default App;
