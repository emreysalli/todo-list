import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function FilterButtonGroup(props) {
  return (
    <div>
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
          onClick={() => props.filtered(null)}
        >
          All
        </Button>
        <Button
          style={{ color: "black", borderColor: "black" }}
          className="filterBtn"
          onClick={() => props.filtered(false)}
        >
          Active
        </Button>
        <Button
          style={{ color: "black", borderColor: "black" }}
          className="filterBtn"
          onClick={() => props.filtered(true)}
        >
          Completed
        </Button>
      </ButtonGroup>
      <Button
        className="clearCompBtn"
        size="medium"
        style={{ color: "black", marginLeft: 10 }}
        onClick={() => props.clearCompleted()}
      >
        Clear completed
      </Button>
    </div>
  );
}
