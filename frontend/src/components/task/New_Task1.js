import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

import i1 from "../i1.jpeg";
import i2 from "../i2.jpeg";

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';


class newTask extends Component {
//Constructor
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.state = {
			name: null,
			description:null,
			deadline:null,
			project:null,
		}
	}
//Handle the Default Input behaviour
	handleInputChange(event){
		const projects= this.props.location.state.projects
		event.preventDefault()
		let key= event.target.name
		let value= event.target.value
		this.setState({
			[key]: value
		})
		this.setState({
			project:projects
		})
	}
//Handle the Default Output behaviour
	handleSubmit(event){
		event.preventDefault()
		let data= this.state
		console.log(data)
		this.Login(data)
	}
//Login Taking Place	
	Login(data){
		const endpoint = 'http://127.0.0.1:8000/api/tasks'
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
            alert("Task Created Successfully!!!\n Press Browser default Back Button")
//            	com.props.history.push({pathname:"/p",state:{company_name:{company}}})
          })
        }
      }
  

//Rendering Output	
	render(){
		const projects= this.props.location.state.projects

   		const {project} = this.state

		const inputStyle={
			borderRadius:50,
			backgroundColor: "lightgreen",
			alignText: "center",
			width:"400px",
			height:"50px",
			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",

		};

		const selectStyle={
			borderRadius:50,
			backgroundColor: "lightgreen",
			alignText: "center",
			width:"400px",
			height:"50px",
			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
			border:"None",			
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
				      		<input style={ inputStyle } id="name" type="text" name="name" className="form-control" placeholder="Enter Name" onChange={this.handleInputChange} required="true"/>
				      		<br/>
				      		<input style={ inputStyle } id="description" type="text" name="description" className="form-control" placeholder="Enter description" onChange={this.handleInputChange} required="true"/>
				      		<br/>
				      		<input style={ inputStyle } id="deadline" type="text" name="deadline" className="form-control" placeholder="Enter deadline" onChange={this.handleInputChange} required="true"/>
				      		<br/>
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

export default newTask;