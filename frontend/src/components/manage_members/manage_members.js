import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';

class manage_members extends Component{
	constructor(props){
		super(props);
		this.company_member = this.company_member.bind(this)
		this.project_member = this.project_member.bind(this)
		this.team_member = this.team_member.bind(this)
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
		return (
			<div>
				<h1><Badge variant="success">MANAGE_ORGANISATION_MEMBERS</Badge></h1>
				&nbsp;<Button variant="info" size="sm" onClick={this.company_member}>+ Company<br/>Member</Button><br/><br/>
				&nbsp;<Button variant="info" size="sm" onClick={this.project_member}>+ Project<br/>Member</Button><br/><br/>
				&nbsp;<Button variant="info" size="sm" onClick={this.team_member}>+ Team<br/>Member</Button>
			</div>
		);
	}
}
export default manage_members;