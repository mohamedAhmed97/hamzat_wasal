import React from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import config from '../token/token'
import { withAlert } from 'react-alert'





class Category extends React.Component {
    
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
            axios.get('http://localhost:8000/api/categories').then(res => {
                console.log(res.data.data);
                this.setState({ data: res.data.data })
                
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
                        
                        { title: "name", field: "category_name" },
                    ]}
                    data={this.state.data}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                               
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        axios.post('http://localhost:8000/api/categories/', { name: newData.category_name }, config)
                                            .then(res => {
                                                
                                                console.log(res);
                                                alert.success('Done!')

                                            }).catch(error => {
                                                console.log(error.response)
                                                alert.error("Error")

                                            });

                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        this.setState((prevState) => {
                                            const data = [...prevState.data];
                                            axios.put('http://localhost:8000/api/categories/' + oldData.category_id, { name: newData.category_name }, config)
                                                .then(res => {
                                                    console.log(res);
                                                    alert.success("Done")
                                                }).catch(error => {
                                                    console.log(error.response)
                                                    alert.error("Error")

                                                });
                                            data[data.indexOf(oldData)] = newData;

                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        console.log(oldData.id);
                                        data.splice(data.indexOf(oldData), 1);
                                        axios.delete('http://localhost:8000/api/categories/' + oldData.category_id, config).then(res => {
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


                />
            </div>
        );
    }
}

export default withAlert()(Category);