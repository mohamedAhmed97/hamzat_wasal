import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import ProfileWorkshops from '../workshops/ProfileWorkshop'
import ProfileBlog from '../Blogs/ProfileBlog';




const current_user = 0;
let load = false;

class Profile extends React.Component {

    
    constructor() {
        super();
        this.state = {
          user: [
          ]
        };
    
      }

      useStyles = makeStyles((theme) => ({
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
    

    //componet before mounted
    componentDidMount() { 
        // Update the document title using the browser API
        // console.log(props.match.params.id)
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/api/users/"+this.props.match.params.id).then(res => {
            this.setState({ user: res.data.user });
            
            console.log("my Data " + this.state.user.id);
            
            
        },load = true);
    }

render(){
    this.classes = this.useStyles;

    
    if (load) {
    
    return (

        <div className={this.classes.root}>
            
            <div className="container">
                <Grid item xs={12}>
                    <Paper variant="outlined" >
                        <br />
                        <div className="span3 well">
                            <center>
                
                                {current_user == 0 ?
                                    <img
                                        src={"http://localhost:8000/storage/user/" +this.state.user.avatar}
                                        name="aboutme" width="140" height="140" className="img-thumbnail rounded-circle" />
                                    :
                                    <img
                                        src={"http://localhost:8000/storage/Mentors/" +this.state.user.avatar}
                                        name="aboutme" width="140" height="140" className="img-thumbnail rounded-circle" />
                                }


                                <h3>{this.state.user.name}</h3>
                                <br />
                            </center>
                        </div>
                    </Paper>
                </Grid>
                <br />
                
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <Paper className={this.classes.paper}>
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
                        <Paper className={this.classes.paper}>
                            {current_user == 0 ?
                                <ProfileBlog user={this.state.user}></ProfileBlog>
                                :
                                <ProfileWorkshops user={this.state.user}></ProfileWorkshops>
                            }

                        </Paper>
                    </Grid>
                </Grid>
            </div>


        </div>

    )

                        }
                        else {
                            return (
                                <div>
                                    Loading...
                                </div>
                            );
                        }
}
}

export default Profile;

