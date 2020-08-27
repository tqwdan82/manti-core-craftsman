import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, TextField, Button, Divider, Typography } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';

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

    let formNameVal = typeof props.formData === 'undefined' ? "":props.formData.formName;
    let pathUriVal = typeof props.formData === 'undefined' ? "":props.formData.pathUri;
    let appNameVal = typeof props.formData === 'undefined' ? "":props.formData.appName;
    let serviceNameVal = typeof props.formData === 'undefined' ? "":props.formData.serviceName;
    let opsNameVal = typeof props.formData === 'undefined' ? "":props.formData.opsName;

    return (
        <Grid
            container
            spacing={0}
            align="center"
            justify="center"
            direction="column"
        >
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
                            <TextField
                                id="formName"
                                name="formName"
                                label="Form Name"
                                placeholder="Name of this Form"                                   
                                fullWidth
                                margin="normal"
                                defaultValue={formNameVal}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                    root: classes.labelRoot
                                    }
                                }}
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="pathUri"
                                name="pathUri"
                                label="URI Path"
                                placeholder="/path/resource"
                                fullWidth
                                margin="normal"
                                defaultValue={pathUriVal}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                    root: classes.labelRoot
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography
                                // className={classes.dividerInset}
                                color="textSecondary"
                                display="block"
                                variant="caption"
                                >
                                Submission To
                            </Typography>
                            <Divider variant="middle" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="appName"
                                name="appName"
                                label="Application Name"
                                fullWidth
                                margin="normal"
                                defaultValue={appNameVal}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                    root: classes.labelRoot
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="serviceName"
                                name="serviceName"
                                label="Service Name"
                                fullWidth
                                margin="normal"
                                defaultValue={serviceNameVal}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                    root: classes.labelRoot
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="opsName"
                                name="opsName"
                                label="Operation Name"
                                fullWidth
                                margin="normal"
                                defaultValue={opsNameVal}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                    root: classes.labelRoot
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<PublishIcon />}
                                fullWidth
                            >
                                Publish
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                
            </Grid>
        </Grid>
    );
}