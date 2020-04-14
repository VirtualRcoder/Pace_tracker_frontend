import React, { Component } from "react";
import cookie from 'react-cookies';
import 'whatwg-fetch';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Company from './company_list';

class App extends Component {
    constructor(props){
    super(props);
  }

state = {
    companies : [],
    local_company: window.localStorage.getItem('email'),
    history_property: this.props,
  }



  displayCompany(){
    const endpoint1 = 'http://127.0.0.1:8000/api/companies'
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
      .then(function(responseData){
         com.setState({
          companies: responseData.results,
        })
      })
    }
  }

  componentDidMount(){
    this.setState({
      companies: [],
    })
    this.displayCompany()
  }


  render(){
    const {companies} = this.state
    const {local_company} = this.state
    const {history_property} = this.state
    let member = false
    let company = []
    return(
      <div className="container">
      <br/>
        <Jumbotron style={{backgroundColor:"#FF6666"}}>
          <center>
            <h1><Badge variant="dark">MY Organisations</Badge></h1>
          </center>

        </Jumbotron>

        {companies.length > 0 ? companies.map((companiesitem, index) =>{
               if(companiesitem.members.length > 0){
                  member = companiesitem.members
                  for(let i=0;i<member.length;i++)
                    if(member[i].member==window.localStorage.getItem('id') && member[i].role=="regular")
                      {
                        return(
                          <ListGroup>
                               <ListGroup.Item variant="success">
                                   <Company name={companiesitem.name} id ={companiesitem.id} companies = {this.state.companies} routes={history_property} role={member[i].role}/>
                               </ListGroup.Item>
                          </ListGroup>
                        )
                      }
                    else if(member[i].member==window.localStorage.getItem('id') && member[i].role=="client"){
                      return(
                        <ListGroup>
                               <ListGroup.Item variant="success">
                                   <Company name={companiesitem.name} id ={companiesitem.id} companies = {this.state.companies} routes={history_property} role={member[i].role}/>
                               </ListGroup.Item>
                          </ListGroup>
                        )
                    }  
                } 
             }):<p>Not Found</p>
       }      
        </div>
      );
  }
}      


export default App;
