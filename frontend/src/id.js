import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import axios from "axios";
import cookie from 'react-cookies'
import 'whatwg-fetch'
import Company from'./components/company_name';

class App extends Component {
  state = {
    companies : [],
  }
  loadme(){
    const endpoint = 'http://127.0.0.1:8000/api/auth/login'
    const endpoint1 = 'http://127.0.0.1:8000/api/company_memberships'
    const csrfToken = cookie.load('csrftoken')
    let data = {
    "email": "sh@gmail.com",
    "password": "1"
    }

    let com = this

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
          let lookupOptions1 = {
            method: "GET",
            headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
            "Authorization":`Token ${token}`},
          }

          fetch(endpoint1, lookupOptions1)
          .then(function(response){return response.json()})
          .then(function(responseData){
            console.log(responseData.results)
            com.setState({
              companies: responseData.results,
            })
          })
        }
      })
      .catch(function(error){console.log("error", error)})
    }  
  }

  componentDidMount(){
    this.setState({
      companies: [],
    })
    this.loadme()
  }

  render(){
    const {companies} = this.state
    return(
      <div>
        <h1>Company Page</h1>    
        {companies.length > 0 ? companies.map((companiesitem, index) =>{
            return(
                <Company name={companiesitem.name} id ={companiesitem.company} />  
            )
        }): <p>Not found</p>}
            
      </div>
      );
  }
}      


export default App;
