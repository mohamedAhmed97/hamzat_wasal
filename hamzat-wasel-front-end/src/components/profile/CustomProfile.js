import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import ProfileBlog from '../Blogs/ProfileBlog';
import ProfileWorkshops from '../workshops/ProfileWorkshop'
import axios from 'axios';

const current_user = 0;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

function Profile(props) {

    const classes = useStyles();
    const [state, setState] = useState({
        user: []
    });




    //componet before mounted
    useEffect(() => {
        // Update the document title using the browser API
        // console.log(props.match.params.id)
        axios.defaults.withCredentials = true;
        axios.get("localhost:8000/api/users/" + props.match.params.id).then((userData) => {
            console.log("my Data " + userData);

            setState({ user: userData });
            current_user = userData.isAdmin;
        }).catch((error) => {
            console.log(error);
        });

        /* setState({ user: cookies.get('UserData') }); */

        return () => {
            console.log("cleaned up");

        };
    }, []);



    return (

        <div className={classes.root}>
            <div class="container">
                <Grid item xs={12}>
                    <Paper variant="outlined" >
                        <br />
                        <div class="span3 well">
                            <center>

                                {current_user == 0 ?
                                    <img
                                        src={"http://localhost:8000/storage/user/" + state.user.avatar}
                                        name="aboutme" width="140" height="140" class="img-thumbnail rounded-circle" />
                                    :
                                    <img
                                        src={"http://localhost:8000/storage/Mentors/" + state.user.avatar}
                                        name="aboutme" width="140" height="140" class="img-thumbnail rounded-circle" />
                                }


                                <h3>{state.user.name}</h3>
                                <br />
                            </center>
                        </div>
                    </Paper>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem button>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Mail" />
                                </ListItem>

                            </List>
                            <Divider />

                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={9}>
                        <Paper className={classes.paper}>
                            {current_user == 0 ?
                                <ProfileBlog user={state.user}></ProfileBlog>
                                :
                                <ProfileWorkshops user={state.user}></ProfileWorkshops>
                            }

                        </Paper>
                    </Grid>
                </Grid>
            </div>


        </div>

    )
}


export default Profile;

