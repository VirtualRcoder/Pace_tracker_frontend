import React, { Component } from "react";
import cookie from 'react-cookies';
import 'whatwg-fetch';
import User from './me_display'

import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

class App extends Component {
  state = {
    user : [],
  }

constructor(props){
  super(props);
  this.edit = this.edit.bind(this)
}

  loadme(){
    const endpoint1 = 'http://127.0.0.1:8000/api/me'
    const csrfToken = cookie.load('csrftoken')
    let com = this

    if(csrfToken !== undefined){
      let token = window.localStorage.getItem('token')
      let lookupOptions1 = {
        method: "GET",
        headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
        "Authorization":`Token ${token}`},
      }

      fetch(endpoint1, lookupOptions1)
      .then(function(response){return response.json()})
      .then(function(responseData){console.log(responseData.image) 
        com.setState({
           user: responseData,
        })
      })
    }
  }

componentDidMount(){
    this.loadme()
  }

edit(){
  let com = this
  com.props.history.push("/e");
}

  render(){
    const {user} = this.state
    return(
      <div className="container">
        <br/>
        <Jumbotron style={{backgroundColor:"#F38BA7"}}>
          <center>
            <h1><Badge variant="dark">MY DETAILS</Badge></h1>
          </center>
          <br/>
          <User first_name={user.first_name} last_name={user.last_name} email={user.email} image={user.image}/>
          <br/><br/>
          <Button variant="info" size="sm" onClick={this.edit}>EDIT_DETAILS</Button>
        </Jumbotron>
      </div>
      );
  }
}      

export default App;
