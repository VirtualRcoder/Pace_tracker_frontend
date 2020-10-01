import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

import i1 from "../i1.jpeg";
import i2 from "../i2.jpeg";

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

class newTimeEntry extends Component {
//Constructor
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)

	}

	state = {
			name: null,
			time_period:null,
			comment:null,
			project:null,
			task:null,
			tasks:[],
		}
//Handle the Default Input behaviour
	handleInputChange(event){
		event.preventDefault()
		let key= event.target.name
		let value= event.target.value
		this.setState({
			[key]: value
		})
	}
//Handle the Default Output behaviour
	handleSubmit(event){
		event.preventDefault()
		delete this.state.tasks
		let data= this.state
		this.Login(data)
	}
//Login Taking Place	
	Login(data){
		const endpoint = 'http://127.0.0.1:8000/api/time_entries'
		const csrfToken = cookie.load('csrftoken')
	    let com = this
	    let company = this.props.location.state.company
	    let company_id = this.props.location.state.company_id

	    if(csrfToken !== undefined){
          let token = window.localStorage.getItem('token')
          let lookupOptions1 = {
            method: "POST",
            headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
            "Authorization":`Token ${token}`},
            body: JSON.stringify(data),
		    credentials: 'include'
          }

          fetch(endpoint, lookupOptions1)
          .then(function(response){return response.json()})
          .then(function(responseData){
            console.log(responseData)
            if(window.localStorage.getItem("is_staff")=="true"){
            	alert("Time Entry Created Successfully!!!\n going to Previous Page")
            	com.props.history.push({pathname:"/padmin",state:{company_name:{company},company_id:{company_id}}})
            }
            else{
            	alert("Time Entry Created Successfully!!!\n going to Previous Page")
            	com.props.history.push({pathname:"/p",state:{company_name:{company}}})
            }
          })
        }
      }

tasks(){
	const endpoint2 = 'http://127.0.0.1:8000/api/tasks'
	const csrfToken = cookie.load('csrftoken')

   if(csrfToken !== undefined){
	    let com = this
        let token = window.localStorage.getItem('token')

	    let lookupOptions2 = {
	      method: "GET",
	      headers: {'Content-Type': 'application/json','X-CSRFToken': csrfToken,
	      "Authorization":`Token ${token}`},
	    }

	    fetch(endpoint2, lookupOptions2)
	    .then(function(response){return response.json()})
	    .then(function(responseData){
	       com.setState({
	        tasks: responseData.results,
	      })
	    })
    }
}      
  
componentDidMount(){
	this.tasks()
}
//Rendering Output	
	render(){
		const projects= this.props.location.state.projects

   		const {project} = this.state

   		const {tasks} = this.state

   		const {task} = this.state

		const inputStyle={
			borderRadius:50,
			backgroundColor: "lightgreen",
			alignText: "center",
			width:"400px",
			height:"50px",
			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",

		};

		const selectStyle={
			border:"None",
			borderRadius:50,
			backgroundColor: "lightgreen",
			alignText: "center",
			width:"400px",
			height:"50px",
			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",			
		};

		const logo={
			background:"#00ff00",
			height:"60px"
		};

		const heading={
			fontSize:"35px",
			color:"green",
		};

		const girlimg= {
			float:"right",
			width:"10%",
		};

   	return(
   		<div className="container">
  		<br/>
   			<div style={ logo }>
   				<img style={{margin:"10px 10px 10px 10px"}} src={i1}/>
   			</div>
   			<br/>
   			<center>
	   			<Jumbotron>
			   		<form onSubmit={this.handleSubmit}>
				      	<div>
				      		<input style={ inputStyle } id="name" type="text" name="name" className="form-control" placeholder="Enter name" onChange={this.handleInputChange} required="true"/>
				      		<br/>
				      		<input style={ inputStyle } id="time_period" type="text" name="time_period" className="form-control" placeholder="Enter time_period" onChange={this.handleInputChange} required="true"/>
				      		<br/>
				      		<input style={ inputStyle } id="comment" type="text" name="comment" className="form-control" placeholder="Enter comment" onChange={this.handleInputChange} required="true"/>
				      		<br/>
				      		<select	value={project}	name="project" style={selectStyle} onChange={this.handleInputChange}>
					      		<option name="project" value="select">Select Project Name</option>
				        		{projects.length > 0 ? projects.map((projectsitem, index) =>{
					              return(
				                		<option name="project" value={projectsitem.id}>{projectsitem.name}</option>
				        	      )    
					        	}): <p>Not found</p>}
				        	</select>
				        	<br/><br/>
							<select	value={task} name="task" style={selectStyle} onChange={this.handleInputChange}>
					      		<option name="task" value="select">Select Task Name</option>
				        		{tasks.length > 0 ? tasks.map((tasksitem, index) =>{
					              return(
				                		<option name="task" value={tasksitem.id}>{tasksitem.name}</option>
				        	      )    
					        	}): <p>Not found</p>}
				        	</select>
				        	<br/><br/>
				      	</div><br/><br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button variant="info" type="submit">Create</Button>
					    <img style={ girlimg }src={ i2 }/>
						<br/>
					</form>
				</Jumbotron>
	      	</center>
	    </div>  	
      )  
   }
}

export default newTimeEntry;