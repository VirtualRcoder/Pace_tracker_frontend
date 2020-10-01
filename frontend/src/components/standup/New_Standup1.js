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
			project: null,
			what_is_done:null,
			what_is_next:null,
			what_is_blocking:null,
			note:null,
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
		this.Login(data)
	}
//Login Taking Place	
	Login(data){
		const endpoint = 'http://127.0.0.1:8000/api/standups'
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
            alert("Standup Created Successfully!!!\n Press browser default Back Button")
//	           	com.props.history.push({pathname:"/ut"})
          })
        }
      }
  

//Rendering Output	
	render(){
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
				        	<input style={ inputStyle } id="what_is_done" type="text" name="what_is_done" className="form-control" placeholder="Enter what_is_done" onChange={this.handleInputChange} />
				      		<br/>
				      		<input style={ inputStyle } id="what_is_next" type="text" name="what_is_next" className="form-control" placeholder="Enter what_is_next" onChange={this.handleInputChange} required="true"/>
				      		<br/>
				      		<input style={ inputStyle } id="what_is_blocking" type="text" name="what_is_blocking" className="form-control" placeholder="Enter what_is_blocking" onChange={this.handleInputChange} required="true"/>
				      		<br/>
				      		<input style={ inputStyle } id="note" type="text" name="note" className="form-control" placeholder="Enter note" onChange={this.handleInputChange} required="true"/>
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