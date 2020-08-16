import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    labelRoot: {
      fontSize: 20,
    },
  }));

export default (props) => {
    const classes = useStyles();
    let id = props.formData.textFieldID;
    let label = props.formData.labelName;
    let currentDate = new Date();
    let currDay = currentDate.getDate();
    let currMth = currentDate.getMonth() + 1;
    let currYear = currentDate.getFullYear();
    let currDateString = currYear + "-" + currMth + "-" + currDay;

    return (
        <TextField
        id={id}
        label={label}
        style={{ margin: 8 }}
        type="date"
        fullWidth
        defaultValue={currDateString}
        margin="normal"
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.labelRoot
          }
        }}
      />
    )
}