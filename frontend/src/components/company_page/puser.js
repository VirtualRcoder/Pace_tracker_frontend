import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import Project from '../project/project_list';

import i1 from "../i1.jpeg";

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

class project extends Component{
	constructor(props){
		super(props);
		this.displayProject = this.displayProject.bind(this)
		this.createTask = this.createTask.bind(this)
		this.createTimeEntry = this.createTimeEntry.bind(this)
		this.createStandup = this.createStandup.bind(this)
    	this.logout = this.logout.bind(this)
	}

	state = {
	    projects : [],
	    local: window.localStorage.getItem('email'),
	  }
	  logout(){
	    window.localStorage.clear()
	    this.props.history.push("/lo");
	  }

	createTask(){
		let projects = this.state.projects
		let company = this.props.location.state.company_name.company
		let company_id = this.props.location.state.company_id.company_id 
		let companies = this.props.location.state.companies
		this.props.history.push({pathname:"/nta",state:{projects,company,company_id,companies}})
	}

	createStandup(){
		let projects = this.state.projects
		let company = this.props.location.state.company_name.company
		let company_id = this.props.location.state.company_id.company_id 
		let companies = this.props.location.state.companies
		this.props.history.push({pathname:"/ns",state:{projects,company,company_id,companies}})
	}

	createTimeEntry(){
		let projects = this.state.projects
		let company = this.props.location.state.company_name.company
		let company_id = this.props.location.state.company_id.company_id 
		let companies = this.props.location.state.companies
		this.props.history.push({pathname:"/nt",state:{projects,company,company_id,companies}})
	}


	displayProject(){
	    const endpoint1 = 'http://127.0.0.1:8000/api/projects'
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
	          projects: responseData.results,
	        })
	      })
	    }
	}

  componentDidMount(){
    this.setState({
      projects: [],
    })
    this.displayProject()
  }

	render(){
		const {projects} = this.state
		const {local} = this.state
    	const history_property = this.props
		const company = this.props.location.state.company_name.company
		const company_id = this.props.location.state.company_id.company_id
		const role = this.props.location.state.role

		const logo={
		  background:"#00ff00",
		  height:"60px"
		};

		const button={
		  float:'right',
		  margin:'10px 10px 0px 0px',
		};

     	
		return(
			<div className="container">
		        <div style={ logo }>
		           <img style={{margin:"10px 10px 10px 10px"}} src={i1}/>
		           <Button variant="warning"style={button} onClick={this.logout}>Logout</Button>
		           <a href="/u" style={button}><Button>My profile</Button></a>
		        </div><br/>

				<Jumbotron style={{backgroundColor:"#F0F074"}}>
					<center>
						<h1><Badge variant="dark">{company}_Details</Badge></h1>
					</center>
					<br/>
					<br/><br/><br/>
					<Button variant="info" size="sm" onClick={this.createStandup}>+ Standup</Button>&nbsp;
					<Button variant="info" size="sm" onClick={this.createTimeEntry}>+ TimeEntry</Button>
	
				</Jumbotron>
				<Jumbotron style={{backgroundColor:""}}>
					<center>
						<h1><Badge variant="dark">PROJECTS</Badge></h1>
					</center>
							
	        		{projects.length > 0 ? projects.map((projectsitem, index) =>{
	        		if(projectsitem.company==company_id)
	                {	
	                	for(let i=0;i<projectsitem.members.length;i++)
	                		if(window.localStorage.getItem('id')==projectsitem.members[i] && role=="regular")
				            { 
				             return(
				           		<ListGroup>
				           			<ListGroup.Item variant="success">
			                			<Project id={projectsitem.id} name={projectsitem.name} company= {company} total_budget={projectsitem.total_budget} budget_spent={projectsitem.budget_spent} deadline={projectsitem.deadline} routes={history_property} role={role}/>
		                   			</ListGroup.Item>	
		                   		</ListGroup>		
			        	      )
			        	    }
   	                		else if(window.localStorage.getItem('id')==projectsitem.members[i] && role=="client")
				            { 
				             return(
				           		<ListGroup>
				           			<ListGroup.Item variant="success">
			                			<Project id={projectsitem.id} name={projectsitem.name} company= {company} total_budget={projectsitem.total_budget} budget_spent={projectsitem.budget_spent} deadline={projectsitem.deadline} routes={history_property} role={role}/>
		                   			</ListGroup.Item>	
		                   		</ListGroup>		
			        	      )
			        	    }   
	        	    }     
		        	}): <p>Not found</p>}
		        </Jumbotron>
		    </div>
		);
	}
}

export default project;