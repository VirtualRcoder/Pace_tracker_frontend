import React, { Component } from 'react';

import i1 from "./components/i1.jpeg";
import i2 from "./i2.jpeg";

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Company extends Component{
	render(){
		const logo={
			background:"#00ff00",
			height:"60px"
		};

		const girlimg= {
			width:"10%",
		};


		const heading={
			fontSize:"20px",
			color:"red",
		};

		const heading1={
			fontSize:"15px",
			color:"green",
		};
			return (
   		<div className="container">
   		<br/>
   			<div style={ logo }>
   				<img style={{margin:"10px 10px 10px 10px"}} src={i1}/>
   			</div>
   			<br/>
   			<center>
	   			<Jumbotron>
			    <img style={ girlimg } src={ i2 }/><br/>
					<p style={heading}>LOGGEDOUT</p> <br/>
					<p><a href="/l">click here</a> to <span style={heading1}>Login</span></p>
				</Jumbotron>
			</center>
		</div>

		);
	}
}
export default Company;
