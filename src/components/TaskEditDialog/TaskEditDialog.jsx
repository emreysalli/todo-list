import React, { useState } from "react";
import "./TaskEditDialog.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function FormDialog(props) {
  const [tempText, setTempText] = useState(props.task[0].text);
  const [tempPriority, setTempPriority] = useState(props.task[0].taskPriority);
  const [tempisComplete, setTempisComplete] = useState(
    props.task[0].isComplete
  );

  const handleSave = () => {
    props.setTaskItems(
      props.taskItems.map((item) =>
        item.id === props.task[0].id
          ? {
              ...item,
              text: tempText,
              isComplete: tempisComplete,
              taskPriority: tempPriority,
            }
          : item
      )
    );
    props.setOpen(false);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open[0]}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent id="dialogContainer">
          <div>
            <TextField
              fullWidth
              autoFocus
              required
              id="outlined-required"
              label="Task"
              type="text"
              value={tempText}
              variant="standard"
              margin="dense"
              onChange={(event) => setTempText(event.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="standard-select-currency"
              select
              label="Select"
              value={tempPriority}
              onChange={(event) => setTempPriority(event.target.value)}
              helperText="Please select your priority"
              variant="standard"
              className="textField"
              margin="dense"
            >
              {Object.keys(props.priorityObj).map(function (key, index) {
                return (
                  <MenuItem value={key} key={index}>
                    {key}
                  </MenuItem>
                );
              })}
            </TextField>
            <FormControlLabel
              id="formControlLabel"
              value="start"
              control={
                <Checkbox
                  checked={tempisComplete}
                  onChange={(event) => setTempisComplete(event.target.checked)}
                />
              }
              label="Completed"
              labelPlacement="start"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
