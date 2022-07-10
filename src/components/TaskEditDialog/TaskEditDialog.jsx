import * as React from "react";
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
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open}>
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
              variant="standard"
              margin="dense"
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="standard-select-currency"
              select
              label="Select"
              //value={currency}
              //onChange={handleChange}
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
              control={<Checkbox />}
              label="Completed"
              labelPlacement="start"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
