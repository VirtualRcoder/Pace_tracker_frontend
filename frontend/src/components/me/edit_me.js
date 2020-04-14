import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

export default class edit  extends Component{

//Constructor
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.state = {
			firsts_name: null,
			last_name: null,
		}
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
		let data= this.state 
		console.log(data)
		this.Login(data)
	}


//Login Taking Place	
	Login(data){
		const endpoint1 = 'http://127.0.0.1:8000/api/me'
		const csrfToken = cookie.load('csrftoken')
    	let com = this
		if(csrfToken !== undefined){
		   let token = window.localStorage.getItem('token')
		   let lookupOptions = {
		    method: "PATCH",
		    headers: {
		      'Content-Type': 'application/json',
		      'X-CSRFToken': csrfToken,
		      "Authorization":`Token ${token}`,
		    },
		    body: JSON.stringify(data),
		    credentials: 'include'
		  }

		  fetch(endpoint1, lookupOptions)
		  .then(function(response){
		    return response.json()
		  })
		  .then(function(responseData){
		  	if(responseData.error_type)
			  	console.log(responseData)
            	com.props.history.push("/u")
			})
		}
	}

	render(){
	   	return(
	   		<div className="container">
	   		<br/>
	   			<div>
	   				<img style={{margin:"10px 10px 10px 10px"}}/>
	   			</div>
	   			<br/>
	   			<center>
		   		<form onSubmit={this.handleSubmit}>
			      	<div>
			      		<input  id="first_name" type="text" name="first_name" className="form-control" placeholder="Enter the first_name" onChange={this.handleInputChange} required="true"/>
			      		<br/>
			      		<input  id="last_name" type="text" name="last_name" className="form-control" placeholder="Enter the last_name" onChange={this.handleInputChange} required="true"/>
			      		<br/>
			      	</div><br/><br/>
					<button>Sign Up</button>
				</form>
		      	</center>
		    </div>  	
	      )  

	}
}