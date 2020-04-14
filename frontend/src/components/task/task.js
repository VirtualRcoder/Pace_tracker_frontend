import React, { Component } from "react";
import cookie from 'react-cookies';
import 'whatwg-fetch';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Task from './display_task';
//created_by not exist here
class App extends Component {
    constructor(props){
    super(props);
  }

  state = {
    tasks : [],
  }


  displayTask(){
    const endpoint1 = 'http://127.0.0.1:8000/api/tasks'
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
          tasks: responseData.results,
        })
         console.log(com.state)
      })
    }
  }

  componentDidMount(){
    this.setState({
      tasks: [],
    })
    this.displayTask()
  }


  render(){
    const {tasks} = this.state
    const local_company= window.localStorage.getItem('email')

    return(
      <div className="container">
      <br/>
        <Jumbotron style={{backgroundColor:"#FF6666"}}>
          <center>
            <h1><Badge variant="dark">Tasks</Badge></h1>
          </center>
        </Jumbotron>
          {
            tasks.length > 0 ? tasks.map((tasksitem, index) =>{
                  return(
                    <Task name={tasksitem.name} project={tasksitem.project} modified={tasksitem.modified_at} description={tasksitem.description} deadline={tasksitem.deadline}/>
                  )
            }): <p>Not found</p>
          }    
      </div>
      );
  }
}      


export default App;
