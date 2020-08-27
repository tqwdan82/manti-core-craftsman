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
    let id = props.formData.componentID;
    let label = props.formData.labelName;
    let currentDate = new Date();
    let currDay = currentDate.getDate() < 10 ? '0'+currentDate.getDate() : currentDate.getDate();
    let currMth = (currentDate.getMonth() + 1) < 10 ?  '0'+currentDate.getMonth() : currentDate.getMonth();
    let currYear = currentDate.getFullYear();
    let currDateString = currYear + "-" + currMth + "-" + currDay;

    return (
        <TextField
        id={id}
        name={id}
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