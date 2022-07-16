import React from "react";
import "./FilterRow.css";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import TaskIcon from "@mui/icons-material/Task";
import FilterButtonGroup from "../FilterButtonGroup/FilterButtonGroup.jsx";

export default function FilterRow(props) {
  return (
    <Box id="filterBox">
      <Badge color="secondary" badgeContent={props.taskCount} id="badge">
        <TaskIcon fontSize="large" color="action" />
      </Badge>
      <FilterButtonGroup
        filtered={props.filtered}
        clearCompleted={props.clearCompleted}
      />
    </Box>
  );
}
