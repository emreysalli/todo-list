import React from "react";
import "./AddRow.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PrioritySelect from "../PrioritySelect/PrioritySelect.jsx";

export default function AddRow(props) {
  return (
    <Box
      id="addBox"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      onSubmit={props.handleAddTask}
    >
      <TextField
        required
        autoFocus
        id="outlined-required"
        label="Task"
        value={props.task}
        variant="outlined"
        helperText="Please write a task"
        onChange={(event) => props.setTask(event.target.value)}
      />
      <PrioritySelect
        priorityObj={props.priorityObj}
        handleChange={props.handleChange}
        priority={props.priority}
      />
      <Button type="submit" id="addBtn" variant="outlined">
        +
      </Button>
    </Box>
  );
}
