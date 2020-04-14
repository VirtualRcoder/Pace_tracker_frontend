import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import ProjectMember from '../manage_members/find_members/project_members';

class projectPage extends Component{
	constructor(props){
		super(props);
	}

	state = {
	    timeEntries : [],
	    tasks: [],
	  }

	displayProject(){
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
	      })

	      endpoint1 = 'http://127.0.0.1:8000/api/tasks'
	      
   	      fetch(endpoint1, lookupOptions1)
	      .then(function(response){return response.json()})
	      .then(function(responseData){
	         com.setState({
	          tasks: responseData.results,
	        })

	      })


	    }
	}

  componentDidMount(){
    this.setState({
      timeEntries: [],
      tasks: [],
    })
    this.displayProject()
  }


	render(){
    const id = this.props.location.state.id
    const name= this.props.location.state.name
    const total_budget= this.props.location.state.total_budget
    const budget_spent= this.props.location.state.budget_spent
    const deadline= this.props.location.state.deadline
    const company = this.props.location.state.company

    const {timeEntries} = this.state
    const {tasks} = this.state

		return (
			<div>
				<h1><Badge variant="success">THIS IS CLIENT PAGE</Badge></h1>
				<br/>
		        <Jumbotron>
             NAME OF PROJECT:&nbsp;{name}<br/>
             Company of project:&nbsp;{company}<br/>
             total_budget:&nbsp;{total_budget}<br/>
             budget_spent:&nbsp;{budget_spent}<br/>
             deadline:&nbsp;{deadline}
       			</Jumbotron>    
       			<Jumbotron>
	       			<table style={{border:"2px solid black"}}>
	       				<tr style={{border:"2px solid black"}}>
	       					<td style={{border:"2px solid black"}}>Task</td>
							<td style={{border:"2px solid black"}}>Time_period</td>
							<td style={{border:"2px solid black"}}>Worked_on</td>
							<td style={{border:"2px solid black"}}>Comment</td>
	       				</tr>
		        		{timeEntries.length > 0 ? timeEntries.map((timeEntriesitem, index) =>{
			        		if(timeEntriesitem.project == id)
			                {
					             return(
									<tr style={{border:"2px solid black"}}>
										<td style={{border:"2px solid black"}}>
	{tasks.length > 0 ? tasks.map((tasksitem, index) =>{
          if(tasksitem.id == timeEntriesitem.task)
            {
              return(
              		<td>{tasksitem.name}</td>
              		)
            }
        }):<p>Not Found</p>
       }
</td>
										<td style={{border:"2px solid black"}}>{timeEntriesitem.time_period}</td>
										<td style={{border:"2px solid black"}}>{timeEntriesitem.modified_at}</td>
										<td style={{border:"2px solid black"}}>{timeEntriesitem.comment}</td>	
									</tr>	
				        	      )
					        }
					        }):<p>Not Found</p>
					    }
				    </table>    	    
       			</Jumbotron>
			</div>
		);
	}
}
export default projectPage;


