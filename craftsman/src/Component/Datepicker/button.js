import React from 'react';
import { Button, makeStyles  } from "@material-ui/core";
// import DialogForm from './dialog';
import ButtonIcon from './icon';

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
            // dialog: <DialogForm handleClose={props.closeHandler}/>,
            // dialog: <DialogForm />,
            title: "Datepicker Field",
            context:"A datepicker with the following configurations.",
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
                    <ButtonIcon size="large"/>Datepicker
            </Button>
        </div>
    )
}