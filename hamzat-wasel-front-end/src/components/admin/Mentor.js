import React from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import config from '../token/token'
import { withAlert } from 'react-alert'





class Mentors extends React.Component {
    
    constructor() {
        super();
        this.state = { //state is by default an object
            data: [

            ],
            name: '',
            alert_message: '',
        };


    }

    componentDidMount() {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/mentors/binding',config).then(res => {
                console.log(res.data.mentor);
                this.setState({ data: res.data.mentor })
                
            }).catch(error => {
                console.log(error.response)
            });
        });
    };


    render() {
        const alert = this.props.alert;
        return (
            <div style={{ maxWidth: "100%" }}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                
                <MaterialTable
                    columns={[
                        
                        { title: "id", field: "id" },
                        { title: "name", field: "title" },
                        { title: "email", field: "email" },
                    ]}
                    data={this.state.data}
                    editable={{
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        console.log(oldData.id);
                                        data.splice(data.indexOf(oldData), 1);
                                        axios.delete('http://localhost:8000/api/mentors/' + oldData.id, config).then(res => {
                                            console.log(res);
                                            alert.success('Done')

                                        }).catch(error => {
                                            console.log(error.response)
                                            alert.error("Error")
                                        });
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                    actions={[
                        {
                          icon: 'save',
                          tooltip: 'Save User',
                          onClick: (event, oldData) => {
                            new Promise((resolve) => {
                              setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                  const data = [...prevState.data];
                                  console.log(oldData.id);
                                  data.splice(data.indexOf(oldData), 1);
                                  axios.put('http://localhost:8000/api/mentors/aprove/'+oldData.id).then(res => {
                                    console.log(res);
                                    alert.success('Done')
                                  }).catch(error => {
                                    console.log(error.response)
                                    alert.error("Error")
                                  });
                                  return { ...prevState, data };
                                });
                              }, 600);
                            })
                          },
                        
                        },
                      ]}


                />
            </div>
        );
    }
}

export default withAlert()(Mentors);