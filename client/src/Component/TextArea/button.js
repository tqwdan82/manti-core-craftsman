import React from 'react';
import { Button, makeStyles  } from "@material-ui/core";
import TextFieldsIcon from '@material-ui/icons/TextFields';
import DialogForm from './dialog';

const useStyles = makeStyles((theme) => ({
    label: {
        // Aligns the content of the button vertically.
        flexDirection: 'column',
        fontSize: '0.7em'
    },
}));

export default (props) => {
    const classes = useStyles();

    const handleClick = (e) => {
        props.onOpenDialog({
            componentId:"TextArea",
            dialog: <DialogForm handleClose={props.closeHandler}/>,
            title: "New Textarea",
            context:"Create a new textarea with the following configurations."
        });
    };

    return (
        <div>
            <Button 
                tooltip="Hide" 
                size="large"
                style={{width: '100%', height: '100px'}} 
                color="primary" 
                variant="outlined" 
                classes={{label: classes.label}} 
                onClick={handleClick}
                >
                    <TextFieldsIcon fontSize="large" color="secondary"/>Textarea
            </Button>
            
        </div>
    )
}