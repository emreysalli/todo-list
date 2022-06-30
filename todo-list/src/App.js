import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./components/Task.js";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

function App() {

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
      let taskDict = {id: taskItems.length, text: task, isComplete: false, taskPriority: priority };
      setTaskItems([...taskItems, taskDict]);
      setPriority("");
      setTask("");
    }
  };

  const completedTask = (id) => {
    let itemsCopy = [...taskItems];
    let index=itemsCopy.findIndex(item=>item.id===id);

    itemsCopy[index].isComplete = !itemsCopy[index].isComplete;

    setTaskItems(itemsCopy);
  };

  const deleteTask = (id) => {
    let itemsCopy = [...taskItems];
    let index=itemsCopy.findIndex(item=>item.id===id);
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

    if(filtered.length===0){
      document.querySelector(".clearCompBtn").style.display="none";
    }else{
      document.querySelector(".clearCompBtn").style.display="inline-block";
    }

    setFilteredTask(taskItems);

  }, [taskItems]);

  const clearCompleted=()=>{
    
    let filtered = taskItems.filter((item) => {
      return item.isComplete === false;
    });

    setTaskItems(filtered);
  }

  return (
    <div className="App">
      <h2 className="sectionTitle">TODO LIST</h2>
      <form onSubmit={handleAddTask}>
        <input
          className="input"
          placeholder={"Write a task"}
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button type="submit" className="addBtn">
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
        aria-label="outlined button group"
        exclusive="true"
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
      <Button className="clearCompBtn" size="medium" style={{color:"black"}} onClick={() => clearCompleted()}>Clear completed</Button>

      {filteredTask.map((item, index) => {
        return (
          <div
            style={{
              backgroundColor: priorityDict[item.taskPriority],
            }}
            className="itemBox"
            key={index}
          >
            <Task text={item.text} id={index} complete={item.isComplete} />
            <div className="buttons">
              <IconButton
                aria-label="delete"
                onClick={() => completedTask(item.id)}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => deleteTask(item.id)}
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
