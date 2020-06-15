import React from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import config from '../token/token';
import CheckIcon from '@material-ui/icons/Check';


class WorkshopUser extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [

      ]
    };

  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/workshopUser/'+this.props.match.params.id, config).then(res => {
      this.setState({ data: res.data.users})
    }).catch(error => {
      console.log(error.response)
    });
  };


  render() {

    return (
      <div style={{ maxWidth: "100%" }} className="container">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          columns={[
            { title: "id", field: "uw_id" },
            { title: "name", field: "name" },
          ]}
          data={this.state.data}
           editable={{
             
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    axios.delete('http://localhost:8000/api/workshopUser/'+oldData.uw_id,config).then(res => {
                      
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
            icon: CheckIcon,
            tooltip: 'Accept User',
            onClick: (event, oldData) => {
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    axios.put('http://localhost:8000/api/approve/'+oldData.uw_id,config).then(res => {
                      
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

export default WorkshopUser;