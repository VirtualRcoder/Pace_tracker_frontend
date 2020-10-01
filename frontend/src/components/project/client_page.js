import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

import i1 from "../i1.jpeg";

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import ProjectMember from '../manage_members/find_members/project_members1';

class projectPage extends Component{
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this)
		this.myTimeEntry = this.myTimeEntry.bind(this)
		this.myTask = this.myTask.bind(this)
		this.myStandup = this.myStandup.bind(this)
	}

	state = {
	    timeEntries : [],
	    tasks: [],
	  }

  	myTimeEntry(){
	    const id = this.props.location.state.id
		this.props.history.push({pathname:"/ct", state:{id}})		
	}

  	myTask(){
	    const id = this.props.location.state.id
		this.props.history.push({pathname:"/ta", state:{id}})		
	}

	myStandup(){
	    const id = this.props.location.state.id
		this.props.history.push({pathname:"/cs", state:{id}})		
	}


	logout(){
		window.localStorage.clear()
		this.props.history.push("/lo");
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
	         console.log(com.props)
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

    const logo={
      background:"#00ff00",
      height:"60px"
    };

    const button={
      float:'right',
      margin:'10px 10px 0px 0px',
    };
    const jumbo={
    	backgroundColor:"#F0F074",
    	height:'340px',
    };

    const jumbo1={
    	float:'right',
    	backgroundColor:"#AAF034",
    };    

		return (
			<div className="container">
		        <div style={ logo }>
		           <img style={{margin:"10px 10px 10px 10px"}} src={i1}/>
		           <Button variant="warning"style={button} onClick={this.logout}>Logout</Button>
		           <a href="/u" style={button}><Button>My profile</Button></a>
		        </div><br/>    
				<br/>
	             <Jumbotron style={jumbo}>
					<Jumbotron style={jumbo1}>
						<Button variant="info" size="sm" onClick={this.myTimeEntry}>View TimeEntry</Button>
						&nbsp;&nbsp;&nbsp;
						<Button variant="info" size="sm" onClick={this.myTask}>View Task</Button>
						&nbsp;&nbsp;&nbsp;						
						<Button variant="info" size="sm" onClick={this.myStandup}>View Standup</Button><br/><br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	
						<Button variant="info" size="sm" onClick={this.projectAnalysis}>Project Report<br/>Analysis</Button>&nbsp;&nbsp;

					</Jumbotron>
		            <h1>
		            	<Badge variant="dark">{name}</Badge>
		            </h1>
		             Company of project:&nbsp;{company}<br/>
		             total_budget:&nbsp;{total_budget}<br/>
		             budget_spent:&nbsp;{budget_spent}<br/>
		             deadline:&nbsp;{deadline}
       			</Jumbotron>

      			<Jumbotron style={{backgroundColor:"#9900FF"}}>
					<center>
			        	<h1><Badge variant="dark">Members Working On the Project</Badge></h1>
			        	<br/>
				  		<ProjectMember id={id}/>
				  	</center>
       			</Jumbotron>

       			<Jumbotron style={{backgroundColor:"#90F094"}}>
	            	<h1 style={{float:'left'}}><Badge variant="dark">Time Sheet Of the Members</Badge></h1>
	            	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	            	<Button variant="info" size="sm" onClick={this.myTimeEntry}>View all TimeEntries<br/>of this User</Button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<Button variant="info" size="sm" onClick={this.myStandup}>View all Standups<br/>of this User</Button>
		       		<br/><br/><br/>
		       		<center>
		            <table style={{border:"2px solid black"}}>
		            	<tr>
		            		<td style={{border:"2px solid black"}}>Date_&_Time</td>
		            		<td style={{border:"2px solid black"}}>Task_Name</td>
		            		<td style={{border:"2px solid black"}}>Time_Period</td>
		            		<td style={{border:"2px solid black"}}>Comment</td>
		            	</tr>
     		            {timeEntries.length > 0 ? timeEntries.map((timeEntriesitem, index) =>{
			        		if(timeEntriesitem.project == id)
			                {
			            return(
  			            	<tr style={{border:"2px solid black"}}>
			            		<td style={{border:"2px solid black"}}>{timeEntriesitem.created_at}</td>
								{tasks.length > 0 ? tasks.map((tasksitem, index) =>{
	          							if(tasksitem.id == timeEntriesitem.task)
	            							{
	              								return(

	              									<td style={{color:'#f000ff'}}>{tasksitem.name}</td>
	              								)
	            							}
	        						}):<p>Not Found</p>
	        					}
			            		<td style={{border:"2px solid black"}}>{timeEntriesitem.time_period}</td>
			            		<td style={{border:"2px solid black"}}>{timeEntriesitem.comment}</td>			            		
        					</tr>
        					)	
       						}
       					}):<p>Not Found</p>
       				}	


				    </table>
				 </center>      
       			</Jumbotron>
			</div>
		);
	}
}
export default projectPage;


