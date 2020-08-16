import React, { useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './store'
import * as Components from './Component/components';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper,Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export default function App() {
  const classes = useStyles();

  const [formComponents, setformComponents] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogForm, setDiaglogForm] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCreate = (event) => {
    setOpen(false);
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = {};
    for (var key of formData.keys()) {
      data[key] = formData.get(key); 
    }
    let FComponent = Components[dialogForm.componentId].Component;
    setformComponents([...formComponents, <FComponent formData={data}/>]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onOpenDialog = (component) => {
    handleClickOpen();
    setDiaglogForm(component);
  }

  const renderDialog = () =>  {
    if(typeof dialogForm === 'undefined') return;

    return (
      <form id="form-component-data" onSubmit={handleCreate}>
      <DialogTitle id="form-dialog-title">{dialogForm.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogForm.context}</DialogContentText>
        {dialogForm.dialog}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Create
        </Button>
      </DialogActions>
      </form>
    );
  }
  const renderForm = () =>  {
    return formComponents.map(Comp => (Comp));
  }

  return (
    <Provider store={ store }>
      <div className={classes.root}>
        <Grid container style={{height:'100vh'}}>
          <Grid item xs={12} sm={2}>
            <Paper className={classes.paper} style={{height:'100%'}}>
                <Grid container spacing={1}>

                  {Object.keys(Components).map(function(key) {
                      let ComponentButton = Components[key].Button;
                      return (
                        <Grid item xs={12} sm={6}>
                          {/* <ComponentButton onAddComponent={addComponent}/> */}
                          <ComponentButton onOpenDialog={onOpenDialog} closeHandler={handleClose}/>
                        </Grid>
                      );
                  })} 
                </Grid>
              </Paper>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Paper className={classes.paper}  style={{height:'100%'}}>
              {renderForm()}
            </Paper>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {renderDialog()}
        </Dialog>
      </div>
    </Provider>
  )
  
}
