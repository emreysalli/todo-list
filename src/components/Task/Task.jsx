import React, { useRef } from "react";
import "./Task.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

function Task(props) {
  let textDecoration, opacity;

  if (props.item.isComplete) {
    textDecoration = "line-through";
    opacity = 0.5;
  } else {
    textDecoration = "none";
    opacity = 1;
  }

  const refOne = useRef(null);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      props.setOpenDialog([true, props.item.id]);
    } else {
      return true;
    }
  };

  return (
    <div
      style={{
        backgroundColor: props.priorityObj[props.item.taskPriority],
        opacity: opacity,
      }}
      className="itemBox"
      onClick={(e) => handleClickOutside(e)}
    >
      <span
        className="itemText"
        style={{
          textDecoration: textDecoration,
        }}
      >
        {props.index + 1} - {props.item.text}
      </span>

      <div ref={refOne}>
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
