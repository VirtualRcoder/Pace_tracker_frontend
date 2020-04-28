import React, { Component } from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import Button from 'react-bootstrap/Button';
import tes from "./x.jpg";
import i1 from "./components/i1.jpeg";
import i2 from "./i2.jpeg";
import Jumbotron from 'react-bootstrap/Jumbotron';

class Register extends Component {
//Constructor
	constructor(props){
		super(props)
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
		this.Registration(data)
	}
//Registration Taking Place	
	Registration(data){
		const endpoint = 'http://127.0.0.1:8000/api/auth/register'
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
		  	if(responseData.error_type)
			  	alert(responseData.error_type)
		    if(responseData.is_active===true){
		      	alert("You have registered Successfully!!  Redirecting to Login Page")
		      	com.props.history.push("/l");
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
		   			<div style={ heading }>
		   				Create a new Vision account for free !
		   				<p style={{ fontSize:"18px" }}>Alredy have an account? <a href="/l">Login here</a></p>
		   			</div><br/>
			   		<form>
				      	<div>
				      		<input  style={inputStyle} id="email" type="text" name="email" 
				      		placeholder="    Email" onChange={this.handleInputChange} required="true"/>
				      		<br/><br/>
				      		<input  style={inputStyle} id="password" type="text" name="password"
				      	   placeholder="     Password" onChange={this.handleInputChange} required="true"/>
				      	   <br/><br/>
				      	   <input  style={inputStyle} id="password" type="text" name="password"
				      	   placeholder="     Confirm password" onChange={this.handleInputChange} required="true"/>
				      	</div><br/><br/>
				      	<Button variant="info" onClick={this.handleSubmit}>Register</Button><br/>
				      	<img style={ girlimg }src={ i2 }/>
			      	</form>
			    </Jumbotron>  	 
		     </center>
	    </div>  	
      )  
   }
}

export default Register;







//import React, { Component } from "react";
//import cookie from 'react-cookies'
//import 'whatwg-fetch'
//import Register from 'register';
//class App extends Component {
//  Registration(){
//    const endpoint = 'http://127.0.0.1:8000/api/auth/register'
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
//      if(responseData.is_active==true){
//        console.log("You have registered Successfully")
//      }
//    })
//    .catch(function(error){
//      console.log("error", error)
//    })
//  }  
//  }
//
//  componentDidMount(){
//    this.Registration()
//  }
//  render(){
//    return(
//      <h1>Registration Page</h1>
//      );
//  }
//}      
//
//export default App;
