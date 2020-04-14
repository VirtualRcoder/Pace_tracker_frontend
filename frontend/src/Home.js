import React, { Component } from "react";
import Register from'./register.js';
import Login from'./Login.js';

export default class Home extends Component{
	constructor(props){
		super(props);
		this.handleregister = this.handleregister.bind(this)
		this.handlelogin = this.handlelogin.bind(this)
	}

	handleregister(){
		this.props.history.push("/r");
	}

	handlelogin(){
		this.props.history.push("/l");
	}


	render(){
		return(
			<div>
				<button onClick={this.handleregister}>register</button>
				<button onClick={this.handlelogin}>login</button>
			</div>
		);
	}
}