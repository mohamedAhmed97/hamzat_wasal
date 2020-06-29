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
import CustomeBlog from '../Blogs/CustomeBlog';
import axios from 'axios';


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
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const [state, setState] = useState({
        user: []
    });

    const userId = state.user.id;






    //componet before mounted
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/" + props.match.params.id)
            .then(res => {
                setState({ user: res.data.user });
                setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(true)
            })
    }, []);
    if (load) {
        return (

            <div className={classes.root}>
                <div class="container">
                    <Grid item xs={12}>
                        <Paper variant="outlined" >
                            <br />
                            <div class="span3 well">
                                <center>
                                    <img
                                        src={"http://localhost:8000/storage/user/" + state.user.avatar}
                                        name="aboutme" width="140" height="140" class="img-thumbnail rounded-circle" />
                                    <h3>{state.user.name}</h3>
                                    <br />
                                </center>
                            </div>
                        </Paper>
                    </Grid>
                    <br />
                    <Grid>
                        <Grid>
                            <Paper className={classes.paper}>
                                <CustomeBlog user={userId}></CustomeBlog>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>


            </div>

        )
    } else {
        return (
            <div>
                Loading...
            </div>
        );
    }
};
    export default Profile;

