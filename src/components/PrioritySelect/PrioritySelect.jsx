import React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
function PrioritySelect(props) {
  return (
    <div>
      <TextField
        select
        id="outlined-select-currency"
        value={props.priority}
        onChange={props.handleChange}
        label="Priority"
        helperText="Please select your priority"
      >
        {Object.keys(props.priorityDict).map(function (key, index) {
          return (
            <MenuItem value={key} key={index}>
              {key}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
  );
}

export default PrioritySelect;
