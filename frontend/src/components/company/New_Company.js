import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

import i1 from "../i1.jpeg";
import i2 from "../i2.jpeg";

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Company extends Component {
//Constructor
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.state = {
			name: null,
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
		this.Login(data)
	}
//Login Taking Place	
	Login(data){
		const endpoint = 'http://127.0.0.1:8000/api/companies'
		const csrfToken = cookie.load('csrftoken')
	    let com = this

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
            alert(responseData.error_type)
	      	alert("Comapany created Successfully!!!\nGoing to previous Page")            
            com.props.history.push("/lc")
          })
        }
      }
  

//Rendering Output	
	render(){
		const inputStyle={
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
				      		<input style={ inputStyle } id="name" type="text" name="name" className="form-control" placeholder="Enter Company_Name" onChange={this.handleInputChange} required="true"/>
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

export default Company;