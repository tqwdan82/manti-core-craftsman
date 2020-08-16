import React from 'react';
import { Button, makeStyles  } from "@material-ui/core";
import DateRangeIcon from '@material-ui/icons/DateRange';
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
            componentId:"Datepicker",
            dialog: <DialogForm handleClose={props.closeHandler}/>,
            title: "New Datepicker Field",
            context:"Create a new datepicker with the following configurations."
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
                    <DateRangeIcon fontSize="large" color="primary"/>Datepicker
            </Button>
        </div>
    )
}