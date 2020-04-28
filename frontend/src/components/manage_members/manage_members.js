import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

import i1 from "../i1.jpeg";

class manage_members extends Component{
	constructor(props){
		super(props);
		this.company_member = this.company_member.bind(this)
		this.project_member = this.project_member.bind(this)
		this.team_member = this.team_member.bind(this)
	    this.logout = this.logout.bind(this)
	}

	logout(){
	window.localStorage.clear()
	this.props.history.push("/lo");
	}
	company_member(){
		this.props.history.push("/ncm")
	}

	project_member(){
		this.props.history.push("/npm")
	}

	team_member(){
		this.props.history.push("/ntm")
	}

	render(){

	    const logo={
	      background:"#00ff00",
	      height:"60px"
	    };

	    const button={
	      float:'right',
	      margin:'10px 10px 0px 0px',
	    };
		
		return (
			<div className="container">
		        <div style={ logo }>
		           <img style={{margin:"10px 10px 10px 10px"}} src={i1}/>
		           <Button variant="warning"style={button} onClick={this.logout}>Logout</Button>
		           <a href="/u" style={button}><Button>My profile</Button></a>
		        </div><br/>    

				<h1><Badge variant="success">MANAGE_ORGANISATION_MEMBERS</Badge></h1>
				&nbsp;<Button variant="info" size="sm" onClick={this.company_member}>+ Company<br/>Member</Button><br/><br/>
				&nbsp;<Button variant="info" size="sm" onClick={this.project_member}>+ Project<br/>Member</Button><br/><br/>
				&nbsp;<Button variant="info" size="sm" onClick={this.team_member}>+ Team<br/>Member</Button>
			</div>
		);
	}
}
export default manage_members;