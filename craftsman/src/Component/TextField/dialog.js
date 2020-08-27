import React from 'react';
import { TextField  } from "@material-ui/core";

export default (props) => {

  let componentIDVal = typeof props.data === 'undefined' ? "":props.data.componentID;
  let labelNameVal = typeof props.data === 'undefined' ? "":props.data.labelName;
  let placeHolderTextVal = typeof props.data === 'undefined' ? "":props.data.placeHolderText;
  let isEditing = typeof props.data === 'undefined'? false:props.data.isEditing;
  
  const IdTextField = () => {
    if(isEditing){
      return(
        <TextField
          margin="dense"
          id="componentID"
          name="componentID"
          label="Textfield ID"
          InputProps={{
            readOnly: true,
          }}
          defaultValue={componentIDVal}
          placeholder="Enter a unique Textfield ID to represent this field"
          fullWidth
          variant="filled"
        />
      );
    }else{
      return(
        <TextField
          margin="dense"
          id="componentID"
          name="componentID"
          label="Textfield ID"
          defaultValue={componentIDVal}
          placeholder="Enter a unique Textfield ID to represent this field"
          fullWidth
        />
      );
    }
  };

  return (
    <div>
      <IdTextField />

      <TextField
        margin="dense"
        id="labelName"
        name="labelName"
        label="Display Label"
        defaultValue={labelNameVal}
        placeholder="Enter a display label for this field"
        fullWidth
      />

      <TextField
        margin="dense"
        id="placeHolderText"
        name="placeHolderText"
        label="Placeholder Display"
        defaultValue={placeHolderTextVal}
        placeholder="Enter a Placeholder display for this field"
        fullWidth
      />
    </div>
  )
};