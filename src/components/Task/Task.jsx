import React from "react";
import "../../App.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

function Task(props) {
  let textDecoration;
  let opacity;

  if (props.item.isComplete) {
    textDecoration = "line-through";
    opacity = 0.5;
  } else {
    textDecoration = "none";
    opacity = 1;
  }

  return (
    <div
      style={{
        backgroundColor: props.priorityDict[props.item.taskPriority],
        opacity: opacity,
      }}
      className="itemBox"
      onClick={() => props.setOpenDialog([true, props.item.id])}
    >
      <div
        className="item"
        style={{
          display: "inline-block",
          marginRight: "5px",
        }}
      >
        <span
          className="itemText"
          id={props.id}
          style={{
            fontSize: "24px",
            color: "#000",
            marginLeft: "5px",
            textDecoration: textDecoration,
          }}
        >
          {props.id + 1} - {props.item.text}{" "}
        </span>{" "}
      </div>
      <div className="buttons">
        <IconButton
          aria-label="delete"
          onClick={() => props.completedTask(props.item.id)}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => props.deleteTask(props.item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default React.memo(Task);
