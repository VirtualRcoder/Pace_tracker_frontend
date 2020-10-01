import React, { Component } from "react";
import cookie from 'react-cookies';
import 'whatwg-fetch';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import TimeEntry from './display_client_timeEntry';

class App extends Component {
    constructor(props){
    super(props);
  }

  state = {
    timeEntries : [],
    tasks : [],
  }



  displaytimeEntry(){
    let endpoint1 = 'http://127.0.0.1:8000/api/time_entries'
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
          timeEntries: responseData.results,
        })
           console.log(com.props.location.state)
           console.log(com.state.timeEntries)
      })

    }

    endpoint1 = 'http://127.0.0.1:8000/api/tasks'
    
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

      console.log(com.state.tasks)
      })
    }
  }

  componentDidMount(){
    this.setState({
      timeEntries: [],
    })
    this.displaytimeEntry()
  }


  render(){
    const {timeEntries} = this.state
    const {tasks} = this.state
    const local_company= window.localStorage.getItem('email')
    const {id} = this.props.location.state

    return(
      <div className="container">
      <br/>
        <Jumbotron style={{backgroundColor:"#FF6666"}}>
          <center>
            <h1><Badge variant="dark">Time Entries</Badge></h1>
          </center>
        </Jumbotron>
        	{
        		timeEntries.length > 0 ? timeEntries.map((timeEntriesitem, index) =>{
		            if(timeEntriesitem.project == id)
		            {   
                  return(
                      tasks.length > 0 ? tasks.map((tasksitem, index) =>{
                     if(timeEntriesitem.task == tasksitem.id){
    		              return(
                        <TimeEntry project={timeEntriesitem.project} modified={timeEntriesitem.modified_at} created_by = {timeEntriesitem.created_by} task={tasksitem.name} time_period={timeEntriesitem.time_period} comment={timeEntriesitem.comment}/>
                      )
                    }
                       }): <p>Not found</p>
                  )
		            }
        		}): <p>Not found</p>
        	}    
      </div>
      );
  }
}      


export default App;
