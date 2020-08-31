/**
 * Component for loading actual form 
 */
import React, { useState, useEffect } from 'react'
import './LoadForm.css'
import * as Util from '../../util/util'
import * as Components from '../../Component/components';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {  Box, Button, Grid, Paper, Snackbar, Typography } from "@material-ui/core";
// import MuiAlert from '@material-ui/lab/Alert';
import { themes, themeNames } from "../../Theme/themes";
import { themeFont, FontKey } from "../../Theme/Font/font";
import { Alert } from '../';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  paper: {
    height: '100%'
  }
}));

export function LoadForm({match}) {
  const classes = useStyles();

  useEffect(()=>{
    fetchFormData();
  },[])

  const [svrFormData, setSvrFormData] = useState({}); // state storing serverside form data
  const [formComponents, setFormComponents] = useState([]); // state storing the components that are rendered in the preview view
  const [sbOpen, setSbOpen] = useState(false); // state storing the state of the alert/toast (true=opened, false=closed)
  const [svrResStatus, setSvrResStatus] = useState({}); // state storing response from server to indicate the type of the alert/toast
  const [theme, setTheme] = useState();
  const [font_type, setFont] = useState("");
  let theming = 0;

  const renderTheme = () => {
    if (typeof theme === "undefined") {
      return;
    } else {
      theming = theme.theme;
    }
  };

  // activate or show the alert/toast
  const handleSBClick = (success) => {
    setSbOpen(true);
    if(success){ // if to show success status and message
      setSvrResStatus({
        status:'success',
        message: 'Data submitted.'
      });
    }else{ // if to show failure status and message
      setSvrResStatus({ 
        status:'error',
        message: 'Data not submitted.'
      });
    }
  };

  // deactivate or close the alert/toast
  const handleSBClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSbOpen(false);
  };

  // make the http call to the server to retrieve form data if there is input parameters to this component
  const fetchFormData = async () => {

    if(Util.isEmpty(match)) { //when there is no form id 

      //TODO: implement handler for empty input
      setSvrFormData({});
      setFormComponents([]);

    } else { //when there is form id 

      // retrieve the form data from the serverside application
      // const response = await fetch(`http://localhost:8001/web/craftsman/api/singleForm?form=${match.params.id}`);
      const response = await fetch(`../../../web/craftsman/api/singleForm?form=${match.params.id}`);
      let constructedFields = [];
      let formConfig = await response.json();
      formConfig.fields.forEach((field) => {
        let FComponent = Components[field.type].Component;
        constructedFields.push(<FComponent formData={field.config}/>);
      });
      setTheme({theme:formConfig.formTheme})
      setFont(formConfig.formFont);
      setSvrFormData(formConfig);
      setFormComponents(constructedFields);
    }

    
  };

  //render the form pages based on the retrieved data
  const renderForm = () =>  {
    return formComponents.map(Comp => (Comp));
  }

  //submit the form data to server service operation
  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = {};
    for (var key of formData.keys()) {
      data[key] = formData.get(key); 
    }

    let submitData = {
      application: svrFormData.appName,
      service: svrFormData.serviceName,
      operation: svrFormData.opsName,
      data: data
    };
    const response = await fetch(
      // `http://localhost:8001/web/craftsman/api/formSubmit`,
      `../../../web/craftsman/api/formSubmit`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(submitData)
      })
      .then(response => response.json())
      .then(data => {
        handleSBClick(true);  
      })
      .catch((error) => {
        console.error('Error:', error);
        handleSBClick(false);  
      });
  };
  
  const SubmitButton = () => {

    if(!svrFormData.appName || !svrFormData.serviceName || !svrFormData.opsName){
      return(
        <div></div>
      );
    }else{
      return(
        <Button 
          type="submit" 
          color="primary"
          variant="contained"
          fullWidth>
          Submit
        </Button>
      );
    }
  };

  return (
    // <div>
      
      <div className={classes.root}>
          {/* Container to the form content  */}
          
          {renderTheme()}
                      <ThemeProvider theme={themes[themeNames[theming]]}>
                        <ThemeProvider
                          theme={(theme) =>
                            createMuiTheme({
                              ...theme,
                              typography: themeFont[FontKey[font_type]],
                            })
                          }
                        >
                          <Paper className={classes.paper} style={{height:'100%'}}>  
          <Grid 
          container
            spacing={0}
            align="center"
            // justify="center"
            direction="column" 
          >
            
            <form id="form-load-data" name="form-load-data" onSubmit={submitForm}>
            
                  
              <Grid item>
                <Box
                  display="flex"
                  flexWrap="nowrap"
                  p={1}
                  m={1}
                  bgcolor="primary.main"
                  color="primary.contrastText"
                  css={{ maxWidth: '80vw' }}
                  justifyContent="center"
                >
                  <Typography variant="h5">{svrFormData.formName}</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  display="flex"
                  flexWrap="nowrap"
                  p={1}
                  m={1}
                  bgcolor="background.paper"
                  css={{ maxWidth: '80vw' }}
                  justifyContent="center"
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                      
                            {renderForm()}
                          
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  display="flex"
                  flexWrap="nowrap"
                  p={1}
                  m={1}
                  bgcolor="background.paper"
                  css={{ maxWidth: '80vw' }}
                  justifyContent="center"
                >
                  <SubmitButton />

                </Box>
              </Grid>
              
            </form>
            
          </Grid>
          
          </Paper>
                        </ThemeProvider>
                      </ThemeProvider>
          {/* toast displaying status */}
      <Snackbar 
      open={sbOpen} 
      autoHideDuration={3000} 
      onClose={handleSBClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
      <Alert onClose={handleSBClose} severity={svrResStatus.status}>
        {svrResStatus.message}
      </Alert>
      </Snackbar>
    </div>
  )
  
}
