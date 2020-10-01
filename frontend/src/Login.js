import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import tes from "./x.jpg";
import i1 from "./components/i1.jpeg";
import i2 from "./i2.jpeg";
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Login extends Component {
//Constructor
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.state = {
			email: null,
			password: null,
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
		const endpoint = 'http://127.0.0.1:8000/api/auth/login'
		const csrfToken = cookie.load('csrftoken')
    	let com = this
		if(csrfToken !== undefined){
		  let lookupOptions = {
		    method: "POST",
		    headers: {
		      'Content-Type': 'application/json',
		      'X-CSRFToken': csrfToken
		    },
		    body: JSON.stringify(data),
		    credentials: 'include'
		  }

		  fetch(endpoint, lookupOptions)
		  .then(function(response){
		    return response.json()
		  })
		  .then(function(responseData){
		  	console.log(responseData)
	    	window.localStorage.setItem('is_active',responseData.is_active)
		  	if(responseData.error_type)
			  	alert(responseData.error_type)
		    if(responseData.is_active===true){
		    	let token = responseData.auth_token
		    	window.localStorage.setItem('token',token)
		    	window.localStorage.setItem('email',data.email)
		    	window.localStorage.setItem('is_staff',responseData.is_staff)
		    	window.localStorage.setItem('id',responseData.id)
		    	console.log(window.localStorage)
		      	alert("You have Login Successfully!! Moving to Dashboard")
		      	if(responseData.is_staff==true)
			      	com.props.history.push("/lc");
			    else
			    	com.props.history.push("/ut");
		    }
		  })
		  .catch(function(error){
		    console.log("error", error)
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
	   		<form>
	   			<div style={ heading }>
	   				Welcome back!
   					<p style={{ fontSize:"18px" }}>Want to create a new account? <a href="/r">Register here</a></p>
   				</div><br/>
		      	<div>
		      		<input style={ inputStyle } id="email" type="text" name="email" className="form-control" placeholder="Enter the email" onChange={this.handleInputChange} required="true"/>
		      		<br/>
		      		<input style={ inputStyle } id="password" type="text" name="password" className="form-control" placeholder="Enter the password" onChange={this.handleInputChange} required="true"/>
		      	</div><br/><br/>
				<Button variant="info" onClick={this.handleSubmit}>Log IN</Button>
				<br/>
			    <img style={ girlimg }src={ i2 }/>
			</form>
			</Jumbotron>
	      	</center>
	    </div>  	
      )  
   }
}

export default Login;





//import logo from './logo.svg';
//import './App.css';
//import React, { Component } from "react";
//import axios from "axios";
//import cookie from 'react-cookies'
//import 'whatwg-fetch'
//class App extends Component {
//  loadme(){
//    const endpoint = 'http://127.0.0.1:8000/api/auth/login'
//    const csrfToken = cookie.load('csrftoken')
//    let data = {
//    "email": "x@gmail.com",
//    "password": "1"
//    }
//
//  if(csrfToken !== undefined){
//    let lookupOptions = {
//      method: "POST",
//      headers: {
//        'Content-Type': 'application/json',
//        'X-CSRFToken': csrfToken
//      },
//      body: JSON.stringify(data),
//      credentials: 'include'
//    }
//
//    fetch(endpoint, lookupOptions)
//    .then(function(response){
//      return response.json()
//    })
//    .then(function(responseData){
//      console.log(responseData)
//
//      if(responseData.is_active==true){
//        console.log("You have Login Successfully"+responseData.auth_token)
//      }
//
//    })
//    .catch(function(error){
//      console.log("error", error)
//    })
//  }  
//  }
//
//  componentDidMount(){
//    this.loadme()
//  }
//  render(){
//    return(
//      <h1>Login Page</h1>
//      );
//  }
//}      
//
//export default App;
