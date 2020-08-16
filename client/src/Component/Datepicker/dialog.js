import React from 'react';
import { TextField } from "@material-ui/core";

export default (props) => {
  return (
    <div>
        <TextField
          margin="dense"
          id="datepickerID"
          name="datepickerID"
          label="Datepicker ID"
          placeholder="Enter a unique Datepicker ID to represent this field"
          fullWidth
        />

        <TextField
          margin="dense"
          id="labelName"
          name="labelName"
          label="Display Label"
          placeholder="Enter a display label for this field"
          fullWidth
        />
    </div>
  )
};