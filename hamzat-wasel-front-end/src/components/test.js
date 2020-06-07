import React from 'react';
import axios from 'axios';
import config from './token/token';
import { Redirect } from 'react-router-dom'
export default class Test extends React.Component
{
    constructor()
    {
        super();
        this.state=
        {
            redirect:false
        }
    }

    test=()=>{
            console.log(config);
            
            axios.get('http://localhost:8000/api/categories',config).then(res => {
             
                console.log(res);
                
            }).catch(error => {
                console.log(error.response)
                if(error.response.status===403)
                {
                    this.setState({redirect:true})
                    this.ProtectedComponent();
                }
                //console.log(this.state);
                
            }); 
        
    }
    ProtectedComponent = () => {
        if (this.state.redirect)
        {
   
            return <Redirect to='/404'  />
        }
  
      }

    render()
    {
       
        return (
             <div>
                {this.ProtectedComponent()}
                <button onClick={this.test}>tt </button>
            </div>   
        );
    }
}