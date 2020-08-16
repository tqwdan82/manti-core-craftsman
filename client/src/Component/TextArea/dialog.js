import React from 'react';
import { TextField } from "@material-ui/core";

export default (props) => {
  return (
    <div>
        <TextField
          margin="dense"
          id="textAreaID"
          name="textAreaID"
          label="Textarea ID"
          placeholder="Enter a unique Textarea ID to represent this field"
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

        <TextField
          margin="dense"
          id="placeHolderText"
          name="placeHolderText"
          label="Placeholder Display"
          placeholder="Enter a Placeholder display for this field"
          fullWidth
        />

        <TextField
          margin="dense"
          id="textareaSize"
          name="textareaSize"
          label="Textarea Size"
          placeholder="Enter a Textarea row size for this field"
          fullWidth
        />
    </div>
  )
};