import React from 'react';
import { Grid, Paper,Button } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles } from '@material-ui/core/styles';

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
  
  const useStylesTooltip = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
  }));

export default (props) => {
    const classes = useStyles();
    const tpClasses = useStylesTooltip();

    let Icon = props.formData.icon;
    return (
      <Paper className={classes.paper} style={{height:'70px', marginBottom:'10px'}}>
        <Tooltip arrow classes={tpClasses} title="Form component settings" >
          <Button variant="outlined" className={classes.componentOptions} onClick={props.openSettings} >
            <MoreHorizIcon fontSize="small" color="primary"/>
          </Button>
        </Tooltip>

        <Tooltip arrow classes={tpClasses} title="Delete this form component" >
          <Button variant="outlined" className={classes.componentOptions} onClick={props.delete} >
            <DeleteForeverIcon fontSize="small" color="primary"/>
          </Button>
        </Tooltip>

        <Tooltip arrow classes={tpClasses} title="Move form component up" >
          <Button variant="outlined" className={classes.componentOptions} onClick={props.moveUp}>
            <ArrowUpwardIcon fontSize="small" color="primary"/>
          </Button>
        </Tooltip>

        <Tooltip arrow classes={tpClasses} title="Move form component down" >
          <Button variant="outlined" className={classes.componentOptions} onClick={props.moveDown}>
            <ArrowDownwardIcon fontSize="small" color="primary"/>
          </Button>
        </Tooltip>

        <Grid
          container
          spacing={0}
          align="center"
          justify="center"
          direction="column"
        >
          <Grid item>
            <div>
              <Icon size='small' />
            </div>
            <div>
              ID: {props.formData.componentID}
            </div>
          </Grid>
          
        </Grid>

      </Paper>
    )
};