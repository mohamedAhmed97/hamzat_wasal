// import React, { Component } from 'react'; 
// import axios from 'axios';
// import Cookies from 'universal-cookie';
// import config from '../token/token';

// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Icon from '@material-ui/core/Icon';
// import CheckIcon from '@material-ui/icons/Check';
// import ClearIcon from '@material-ui/icons/Clear';




//           const StyledTableCell = withStyles((theme) => ({
//             head: {
//               backgroundColor: "#24c0d1",
//               color: theme.palette.common.white,
//               fontSize: 20
//             },
//             body: {
//               fontSize: 20,
//             },
//           }))(TableCell);
          
//           const StyledTableRow = withStyles((theme) => ({
//             root: {
//               '&:nth-of-type(odd)': {
//                 backgroundColor: theme.palette.action.hover,
//               },
//             },
//           }))(TableRow);
          

// export default class WorkshopUser extends Component{
//     constructor(props){
//         super(props)
//         this.state= {
//             users:[],
            
//         }

//         const cookies = new Cookies();
//         const current_user = cookies.get('UserData');
//         // console.log(current_user);

//     }

//     componentDidMount (){ 
//         axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
//             // console.log(response);
//             axios.get('http://localhost:8000/api/workshopUser/'+this.props.match.params.id,config).then(res => {
//                 // console.log(res.data.users);
//                 this.setState({ users: res.data.users})
                    
//             }).catch(error => {
//                 console.log(error.response)
//             }); 
//         });
//     };

    

//     render()
//     {   


//         let users = this.state.users;
        
    
//         return(
//             // <div>
//             //     {users.map(user => { return(
//             //     <p>{user.name}</p>

//             //     );})}
//             // </div>
//             <div className="container">           
//              <TableContainer component={Paper}>
//       <Table aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Name</StyledTableCell>
//             <StyledTableCell align="right">Accept</StyledTableCell>
//             <StyledTableCell align="right">Reject</StyledTableCell>
            
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((user) => (
//             <StyledTableRow key={user.name}>
//               <StyledTableCell component="th" scope="row">
//                 {user.name}
//               </StyledTableCell>
//               <StyledTableCell align="right">
//                 <button className="btn btn-info font-weight-bold m-1">
//                     <CheckIcon />
//                   </button>
//               </StyledTableCell>
//               <StyledTableCell align="right">
//               <button className="btn btn-info font-weight-bold m-1">
//                     <ClearIcon />
//                   </button>
                  
//               </StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </div>

//   );
        
//     }
// }





import React from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import config from '../token/token';
import CheckIcon from '@material-ui/icons/Check';


class WorkshopUser extends React.Component {

  constructor() {
    super();
    this.state = { //state is by default an object
      data: [

      ]
    };

  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/workshopUser/'+this.props.match.params.id, config).then(res => {
      this.setState({ data: res.data.users})
      console.log(this.state.data);
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
                    console.log(oldData.id);
                    data.splice(data.indexOf(oldData), 1);
                    axios.delete('http://localhost:8000/api/workshopUser/'+oldData.uw_id,config).then(res => {
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
            icon: CheckIcon,
            tooltip: 'Accept User',
            onClick: (event, oldData) => {
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    console.log(oldData.uw_id);
                    data.splice(data.indexOf(oldData), 1);
                    axios.put('http://localhost:8000/api/approve/'+oldData.uw_id,config).then(res => {
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

export default WorkshopUser;