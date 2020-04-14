import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import axios from "axios";
import cookie from 'react-cookies'
import 'whatwg-fetch'
class App extends Component {
  loadme(){
    const endpoint = 'http://127.0.0.1:8000/api/auth/login'
    const endpoint1 = 'http://127.0.0.1:8000/api/companies'
    const csrfToken = cookie.load('csrftoken')
    let data = {
    "email": "sh@gmail.com",
    "password": "1"
    }

    if(csrfToken !== undefined){
      let lookupOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken},
        body: JSON.stringify(data),
        credentials: 'include',
      }

      fetch(endpoint, lookupOptions)
      .then(function(response){return response.json()})
      .then(function(responseData)
      {
        console.log(responseData)
        
        if(responseData.is_active===true)
        {
          console.log("You have Login Successfully\n")
          let token = responseData.auth_token
          console.log(token)
          let lookupOptions1 = {
            method: "GET",
            headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
            "Authorization":`Token ${token}`},
          }

          fetch(endpoint1, lookupOptions1)
          .then(function(response){return response.json()})
          .then(function(responseData){console.log(responseData)})
        }
      })
      .catch(function(error){console.log("error", error)})
    }  
  }

  componentDidMount(){
    this.loadme()
  }

  render(){
    return(
      <h1>Login Page</h1>
      );
  }
}      

export default App;
