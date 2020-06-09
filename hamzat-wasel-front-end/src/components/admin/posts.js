import React from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import config from '../token/token'


class Posts extends React.Component {

  constructor() {
    super();
    this.state = { //state is by default an object
      data: [

      ]
    };

  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/posts/waiting', config).then(res => {
      this.setState({ data: res.data.data })
      //console.log(this.state.data);
    }).catch(error => {
      console.log(error.response)
    });
  };


  render() {

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
            { title: "category", field: "categoryinfo.category_name" },
            { title: "user", field: "userinfo.name" },

          ]}
          data={this.state.data}
           editable={{
             /*
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
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
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),*/
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    console.log(oldData.id);
                    data.splice(data.indexOf(oldData), 1);
                    axios.delete('http://localhost:8000/api/posts/'+oldData.id,config).then(res => {
                      console.log(res);
                      
                    }).catch(error => {
                      console.log(error.response)
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
                    axios.put('http://localhost:8000/api/posts/approve/'+oldData.id).then(res => {
                      console.log(res);
                      
                    }).catch(error => {
                      console.log(error.response)
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

export default Posts;