import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
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
    let placeHolder = props.formData.placeHolderText;
    let size = props.formData.textareaSize;
    
    return (
        <div className={classes.root}>
        <TextField
                id={id}
                name={id}
                label={label}
                style={{ margin: 8 }}
                placeholder={placeHolder}
                helperText=""
                fullWidth
                margin="normal"
                multiline
                rows={size}
                InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.labelRoot
                    }
                }}
        />
        </div>
    )
}