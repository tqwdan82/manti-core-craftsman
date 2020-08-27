/**
 * Component for new form or edit form 
 */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import './DevForm.css'
import * as Util from './util/util'
import * as Components from './Component/components';
import ListComponent from './Component/listComponent';
import PublishComponent from './Publish';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Tabs, Tab, Paper,Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  componentOptions: {
    top: "10%",
    marginRight: '5px',
    float: "right",
    position: "relative",
    transform: "translateY(-50%)"
  },
}));

// container to hold tab contents
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fb-tabpanel-${index}`}
      aria-labelledby={`fb-tab-${index}`}
      style={{height:'100%'}}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

// tab container properties
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// tab selection handler
function a11yProps(index) {
  return {
    id: `fb-tab-${index}`,
    'aria-controls': `fb-tabpanel-${index}`,
  };
};

// the alert/toast to show the status of http calls
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DevForm({match}) {
  const classes = useStyles();

  const [formComponents, setformComponents] = useState([]); // state storing the components that are rendered in the preview view
  const [fcData, setFCData] = useState([]); // state storing the component configuration data
  const [formId, setFormId] = useState(); //state storing the primary key(formId) of a retrieved form from database 
  const [open, setOpen] = useState(false); //state storing the state of the dialog window (true=opened, false=closed)
  const [dialogForm, setDialogForm] = useState(); //state storing the dialog form component
  const [dbData, setDbData] = useState([]); // state storing the database data retrieved from/to save to server
  const [value, setValue] = useState(0); // state storing the selected tab to be displayed 
  const [pfData, setPfData] = useState({}); // state storing the data in the publish page form
  const [sbOpen, setSbOpen] = useState(false); // state storing the state of the alert/toast (true=opened, false=closed)
  const [svrResStatus, setSvrResStatus] = useState({}); // state storing response from server to indicate the type of the alert/toast

  useEffect(()=>{
    fetchFormData();
  },[])

  // make the http call to the server to retrieve form data if there is input parameters to this component
  const fetchFormData = async () => {
    if(Util.isEmpty(match.params)) {  // if there is no input parameters

      //new form initialization
      setformComponents([]);
      setFCData([]);
      setOpen(false);
      setDbData([]);
      setValue(0);
      setPfData({});
      setSbOpen(false);
      setFormId();

    } else { // if there is input parameters

      //make a call to the application server to retrieve form data
      const response = await fetch(`http://localhost:8001/web/craftsman/api/singleForm?form=${match.params.id}`);
      // const response = await fetch(`../../../web/craftsman/api/singleForm?form=${match.params.id}`);
      let formConfig = await response.json();
    
      setFormId(formConfig.formId);

      //set publish form data
      let pfData = {
        formName: formConfig.formName,
        pathUri: formConfig.pathUri,
        appName: formConfig.appName,
        serviceName: formConfig.serviceName,
        opsName: formConfig.opsName
      };
      setPfData(pfData);

      //set preview form data
      let constructedFields = [];
      let constructedDbData = [];
      let constructedFcData = [];
      formConfig.fields.forEach((field) => {

        //create the preview components
        let FComponent = Components[field.type].Component;
        constructedFields.push(<FComponent formData={field.config}/>);
      
        //create the data
        constructedDbData.push({
          dbId: field.formFieldId,
          id: field.config.componentID,
          type: field.type,
          config: field.config
        });

        //create the field configuration component
        let mfcField = Object.assign({}, field.config);
        mfcField['icon']= Components[field.type].Icon;
        mfcField['type']= field.type;
        constructedFcData.push(mfcField);
      });

      setDbData(constructedDbData);
      setformComponents(constructedFields);
      setFCData(constructedFcData);
      
    }
  };

  // activate or show the alert/toast
  const handleSBClick = (success) => {
    setSbOpen(true);
    if(success){ // if to show success status and message
      setSvrResStatus({
        status:'success',
        message: 'Form published!'
      });
    }else{ // if to show failure status and message
      setSvrResStatus({
        status:'error',
        message: 'Form not published.'
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

  // to delete created/existing components
  const deleteComponent = (id) => {

    //delete the form configuration component
    const index = fcData.findIndex((c) => c.componentID === id);
		fcData.splice(index, 1);
    setFCData([...fcData]);
    
    //delete the preview form component
    formComponents.splice(index, 1);
    setformComponents([...formComponents]);

    //delete the form data component
    dbData.splice(index, 1);
    setDbData([...dbData]);
    
  };

  // to move created/existing components up
  const moveComponentUp = (id) => {
    const index = fcData.findIndex((c) => c.componentID === id);
    if(index !== 0){ // if not the first item can move up 

      //move the form configuration component
      var selectEle = fcData[index];
      fcData.splice(index, 1);
      fcData.splice(index-1, 0, selectEle);
      setFCData([...fcData]);

      //move the preview form component
      var selectDisEle = formComponents[index];
      formComponents.splice(index, 1);
      formComponents.splice(index-1, 0, selectDisEle);
      setformComponents([...formComponents]);

      //move the form data component
      var selectData = dbData[index];
      dbData.splice(index, 1);
      dbData.splice(index-1, 0, selectData);
      setDbData([...dbData]);
    }
		
  };

  // to move created/existing components down
  const moveComponentDown = (id) => {
    const index = fcData.findIndex((c) => c.componentID === id);
    if(index !== fcData.length-1){ // if not the last item can move down

      //move the form configuration component
      var selectEle = fcData[index];
      fcData.splice(index, 1);
      fcData.splice(index+1, 0, selectEle);
      setFCData([...fcData]);

      //move the preview form component
      var selectDisEle = formComponents[index];
      formComponents.splice(index, 1);
      formComponents.splice(index+1, 0, selectDisEle);
      setformComponents([...formComponents]);

      //move the form data component
      var selectData = dbData[index];
      dbData.splice(index, 1);
      dbData.splice(index+1, 0, selectData);
      setDbData([...dbData]);
    }
  };

  // handler to create new components
  const handleCreate = (event) => {
    
    //close the dialog 
    setOpen(false);

    //get the form data
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = {};
    for (var key of formData.keys()) {
      data[key] = formData.get(key); 
    }

    //get and set form configuration data
    data['icon'] = Components[dialogForm.componentId].Icon;
    data['type'] = dialogForm.componentId;
    setFCData([...fcData, data]);

    //get and set the form preview 
    let FComponent = Components[dialogForm.componentId].Component;
    setformComponents([...formComponents, <FComponent formData={data}/>]);
  
    //get and set the database data
    let cloneData = Object.assign({}, data);
    let newData = {
      id:data.componentID,
      type: dialogForm.componentId,
      config: cloneData
    }
    setDbData(dbData => ([...dbData, newData]));
  };

  // handler to editing existing components
  const handleEdit = (event) => {
    
    //close the dialog 
    setOpen(false);

    //get the form data
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = {};
    for (var key of formData.keys()) {
      data[key] = formData.get(key); 
    }
 
    //looking up the existing form configuration data by id
    const index = fcData.findIndex((c) => c.componentID === data.componentID);
    //updates form configuration data in the state
    let mergedFcData = Object.assign(fcData[index], data);
    fcData.splice(index, 1, mergedFcData);
    setFCData(fcData);

    //updates preview rendered form components in the state
    let FComponent = Components[mergedFcData.type].Component;
    formComponents.splice(index, 1, <FComponent formData={mergedFcData}/>);
    setformComponents(formComponents);

    //updates form data in the state
    let cloneData = Object.assign({}, dbData[index]);
    cloneData.config = data
    dbData.splice(index, 1, cloneData);
    setDbData(dbData);

  };

  // handler for dialog closing
  const handleClose = () => {
    setOpen(false);
  };

  // handler for dialog opening
  const handleClickOpen = () => {
    setOpen(true);
  };

  // function to be passed to the component and set the displayed dialog form
  const onOpenDialog = (component) => {
    handleClickOpen();
    let DialogForm = Components[component.componentId].Dialog;
    component.dialog = <DialogForm />
    setDialogForm(component);
  }

  // function to handle reopening of dialogs
  const reOpenDialog = (id, dialog) => {
    handleClickOpen();

    //find existing form configuration in state
    let index = fcData.findIndex((c) => c.componentID === id);
    let data = fcData[index];

    //pass the data to dialog to display
    let dialogObj = {};
    let cloneData = { ...data };
    cloneData.isEditing = true;
    let DialogForm = Components[dialog].Dialog;
    dialogObj.dialog = <DialogForm data={cloneData}/>
    dialogObj.isEditing = true;
    setDialogForm(dialogObj);

  }

  //rendering the dialog form based on the set dialog state
  const renderDialog = () =>  {
    if(typeof dialogForm === 'undefined') return;

    let title = dialogForm.title;
    if(dialogForm.isEditing){

      title = "Edit " +  title;

      return (
        <form id="form-component-data" onSubmit={handleEdit}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogForm.context}</DialogContentText>
          {dialogForm.dialog}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Edit
          </Button>
        </DialogActions>
        </form>
      );
    }else{

      title = "Create New " +  title;

      return (
        <form id="form-component-data" onSubmit={handleCreate}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
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
  };

  //render the form preview pages
  const renderForm = () =>  {
    return formComponents.map(Comp => (Comp));
  }

  //render the form configuration component on the form construction page
  const renderFormConstruction = () =>  {
    return fcData.map((Comp, index) => {
			return (
				<ListComponent
					key={index}
					formData={Comp}
          delete={() => deleteComponent(Comp.componentID)}
          moveUp={() => moveComponentUp(Comp.componentID)}
          moveDown={() => moveComponentDown(Comp.componentID)}
          openSettings={() => reOpenDialog(Comp.componentID, Comp.type)}
					componentID={Comp.componentID}
				/>
			);
		});
  };

  //handle the tab click change
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  //handle the form creation submission to the server to save the form data
  const submitFormData = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = {};
    for (var key of formData.keys()) {
      data[key] = formData.get(key); 
    }

    //set the publish form data
    setPfData(data);

    //assign all the form fields for the form the created
    data.fields = [];
    let order = 0;
    Object.keys(dbData).forEach( (dbDataKey) => {
      dbData[dbDataKey].order = ++order;
      data.fields.push(dbData[dbDataKey]);
    })
    //set the formId if is editing data
    if(!!formId){
      data.formId = formId;
    }

    //make the call to server to save the form fields
    const response = await fetch(
      //`../../../web/craftsman/api/craftsmanFormFormFields`
      `http://localhost:8001/web/craftsman/api/craftsmanFormFormFields`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
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

  return (
      <div className={classes.root}>
        {/* the top tabbed bar */}
        <AppBar position="static" style={{ position: 'relative' }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="Craftsman Tab"
            centered
          >
            <Tab label="Develop" {...a11yProps(0)} wrapped/>
            <Tab label="Preview" {...a11yProps(1)} wrapped/>
            <Tab label="Publish" {...a11yProps(1)} wrapped/>
          </Tabs>
        </AppBar>

        {/* the tab panel containing the construction panel */}
        <TabPanel value={value} index={0}>
          <Grid container height="100%" style={{height:'100%'}}>
            <Grid item xs={12} sm={2}>
              <Paper className={classes.paper} style={{height:'100%'}}>
                  <Grid container spacing={1}>

                    {Object.keys(Components).map(function(key, i) {
                        let ComponentButton = Components[key].Button;
                        return (
                          <Grid key={i} item xs={12} sm={6}>
                            <ComponentButton onOpenDialog={onOpenDialog} closeHandler={handleClose}/>
                          </Grid>
                        );
                    })} 
                  </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Paper className={classes.paper} style={{height:'100%'}}>
                {renderFormConstruction()}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* the tab panel for preview panel */}
        <TabPanel value={value} index={1}>
          <Grid container style={{height:'90vh'}}>
            <Grid item xs={12} sm={12}>
              <Paper className={classes.paper} style={{height:'100%'}}>
                {renderForm()}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* the tab panel for form publishing panel */}
        <TabPanel value={value} index={2}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Paper className={classes.paper} style={{height:'100%'}}>
                <form id="form-config-data" onSubmit={submitFormData}>
                  <PublishComponent formData={pfData}/>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Dialog windown */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {renderDialog()}
        </Dialog>

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
