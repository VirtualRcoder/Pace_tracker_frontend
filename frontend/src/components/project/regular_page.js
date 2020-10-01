import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

import i1 from "../i1.jpeg";

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import ProjectMember from '../manage_members/find_members/project_members';


class projectPage extends Component{
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this)
		this.timer = this.timer.bind(this)
		this.createTask = this.createTask.bind(this)
		this.myTask = this.myTask.bind(this)
		this.createStandup = this.createStandup.bind(this)
		this.myStandup = this.myStandup.bind(this)
		this.createTimeEntry = this.createTimeEntry.bind(this)
		this.myTimeEntry = this.myTimeEntry.bind(this)
	}

	state = {
	    timeEntries : [],
	    tasks: [],
	    standups: [],
	    status:'stop',
	  }

	logout(){
		window.localStorage.clear()
		this.props.history.push("/lo");
	}

	timer(event){
		if(this.state.status=='stop')
			{
				alert("Start Timer");
				this.setState({
					status:'start',
				})
			}
		else
		{
			alert("Timer Stopped");
			this.setState({
					status:'stop',
				})
		}

	}

	createTimeEntry(){
		const projects = this.props.location.state.id
		this.props.history.push({pathname:"/nt1",state:{projects}})		
	}

	myTimeEntry(){
		this.props.history.push({pathname:"/t"})		
	}

	createTask(){
		const projects = this.props.location.state.id
		this.props.history.push({pathname:"/nta1",state:{projects}})		
	}


	myTask(){
		const id = this.props.location.state.id
		this.props.history.push({pathname:"/ta",state:{id}})		
	}


	createStandup(){
		const projects = this.props.location.state.id
		this.props.history.push({pathname:"/ns1",state:{projects}})
	}


	myStandup(){
		this.props.history.push({pathname:"/s"})	
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

	      endpoint1 = 'http://127.0.0.1:8000/api/standups'
	      
   	      fetch(endpoint1, lookupOptions1)
	      .then(function(response){return response.json()})
	      .then(function(responseData){
	         com.setState({
	          standups: responseData.results,
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
    const {standups} = this.state

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
						<Button variant="info" size="sm" onClick={this.myTimeEntry}>View TimeEntry</Button>&nbsp;&nbsp;
						<Button variant="info" size="sm" onClick={this.myStandup}>View Standup</Button>&nbsp;&nbsp;
						<Button variant="info" size="sm" onClick={this.myTask}>View Task</Button><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		
						<Button variant="info" size="sm" onClick={this.createTimeEntry}>+ TimeEntry</Button>&nbsp;&nbsp;
						<Button variant="info" size="sm" onClick={this.createStandup}>+ Standup</Button>&nbsp;&nbsp;
						<Button variant="info" size="sm" onClick={this.createTask}>+ Task</Button>
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
		            	<h1><Badge variant="dark">Latest Task of this project</Badge></h1>
						<br/>
						{tasks.length > 0 ? tasks.map((tasksitem, index) =>{
					          if(tasksitem.project == id)
					            {										            	
					              return(
										<Button variant="warning" size="bg"style={{margin:'0px 10px 0px 0px'}}>{tasksitem.name}</Button>					              		
					              	)
					            }
					        }):<p>Not Found</p>
				        }
					</center>    
       			</Jumbotron>

       			<Jumbotron style={{backgroundColor:"#90F094"}}>
					<center>
		            	<h1><Badge variant="dark">Last Week "MY" Time Entries and Standups</Badge></h1>
		            	<br/>
		            <table style={{border:"2px solid black"}}>
		            	<tr>
		            		<td style={{border:"2px solid black"}}>Date_&_Time</td>
		            		<td style={{border:"2px solid black"}}>Task_Name</td>
		            		<td style={{border:"2px solid black"}}>Time_Period</td>
		            		<td style={{border:"2px solid black"}}>Comment</td>
		            	</tr>
     		            {timeEntries.length > 0 ? timeEntries.map((timeEntriesitem, index) =>{
			        		if(timeEntriesitem.project == id && timeEntriesitem.created_by==window.localStorage.getItem('email'))
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
				    <br/><br/><br/>
		            <table style={{border:"2px solid black"}}>
		            	<tr>
		            		<td style={{border:"2px solid black"}}>Created_At</td>
		            		<td style={{border:"2px solid black"}}>What_is_done</td>
		            		<td style={{border:"2px solid black"}}>What_is_next</td>
		            		<td style={{border:"2px solid black"}}>What_is_blocking</td>
		            		<td style={{border:"2px solid black"}}>Note</td>
		            	</tr>
     		            {standups.length > 0 ? standups.map((standupsitem, index) =>{
			        		if(standupsitem.project == id && standupsitem.created_by==window.localStorage.getItem('email'))
			                {
			            return(
  			            	<tr style={{border:"2px solid black"}}>
		            		<td style={{border:"2px solid black"}}>{standupsitem.created_at}</td>
		            		<td style={{border:"2px solid black"}}>{standupsitem.what_is_done}</td>
		            		<td style={{border:"2px solid black"}}>{standupsitem.what_is_next}</td>
		            		<td style={{border:"2px solid black"}}>{standupsitem.what_is_blocking}</td>
		            		<td style={{border:"2px solid black"}}>{standupsitem.note}</td>	            		
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


